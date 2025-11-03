// Custom hook for authentication using React Query

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";
import type { LoginCredentials } from "../types/auth.types";
import { getAccessToken } from "../lib/axios";
import { tokenStorage } from "../lib/tokenStorage";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      authService.login(credentials),
    onSuccess: (data) => {
      // Store user data in cache
      queryClient.setQueryData(["user"], data.user);
      // Navigate to dashboard
      navigate("/dashboard");
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear all queries
      queryClient.clear();
      // Navigate to login
      navigate("/login");
    },
  });

  // Get current user query
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token");
      }
      return authService.getCurrentUser(token);
    },
    enabled: !!getAccessToken(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Check if user is authenticated
  const isAuthenticated =
    !!getAccessToken() && !!tokenStorage.getRefreshToken();

  // Initialize auth state on app load
  const initializeAuth = () => {
    const refreshToken = tokenStorage.getRefreshToken();
    if (refreshToken) {
      // User has refresh token, they might be logged in
      // The axios interceptor will handle token refresh if needed
      return true;
    }
    return false;
  };

  return {
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    user: userQuery.data,
    isLoading:
      loginMutation.isPending ||
      logoutMutation.isPending ||
      userQuery.isLoading,
    isAuthenticated,
    loginError: loginMutation.error,
    userError: userQuery.error,
    initializeAuth,
  };
};
