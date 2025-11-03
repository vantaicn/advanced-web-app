// Axios instance with interceptors for authentication

import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { tokenStorage } from "./tokenStorage";
import { mockApi } from "../services/mockApi";

// Create axios instance
export const api = axios.create({
  baseURL: "/api", // In production, this would be your API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Access token stored in memory (not in localStorage for security)
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = (): string | null => {
  return accessToken;
};

// Flag to prevent multiple simultaneous refresh requests
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Request interceptor: Attach access token to every request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle 401 errors and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = tokenStorage.getRefreshToken();

      if (!refreshToken) {
        // No refresh token available, logout
        processQueue(new Error("No refresh token available"), null);
        isRefreshing = false;
        handleLogout();
        return Promise.reject(error);
      }

      try {
        // Call refresh token endpoint
        const response = await mockApi.refreshToken(refreshToken);
        const newAccessToken = response.accessToken;

        // Update access token
        setAccessToken(newAccessToken);

        // Update authorization header
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Process queued requests
        processQueue(null, newAccessToken);

        isRefreshing = false;

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token is invalid or expired
        processQueue(refreshError as Error, null);
        isRefreshing = false;
        handleLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Logout handler
const handleLogout = () => {
  setAccessToken(null);
  tokenStorage.clearTokens();

  // Redirect to login page
  window.location.href = "/login";
};
