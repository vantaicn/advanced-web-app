// Authentication service that uses the mock API

import type { AuthResponse, LoginCredentials, User } from "../types/auth.types";
import { mockApi } from "./mockApi";
import { setAccessToken } from "../lib/axios";
import { tokenStorage } from "../lib/tokenStorage";

export const authService = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await mockApi.login(credentials);

    // Store access token in memory
    setAccessToken(response.accessToken);

    // Store refresh token in localStorage
    tokenStorage.setRefreshToken(response.refreshToken);

    return response;
  },

  // Logout user
  logout: async (): Promise<void> => {
    // Clear tokens
    setAccessToken(null);
    tokenStorage.clearTokens();
  },

  // Get current user
  getCurrentUser: async (accessToken: string): Promise<User> => {
    return mockApi.getCurrentUser(accessToken);
  },

  // Get protected data
  getProtectedData: async (accessToken: string) => {
    return mockApi.getProtectedData(accessToken);
  },
};
