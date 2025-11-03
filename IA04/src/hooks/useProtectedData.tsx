// Custom hook for fetching protected data using React Query

import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { getAccessToken } from "../lib/axios";

export const useProtectedData = () => {
  return useQuery({
    queryKey: ["protectedData"],
    queryFn: async () => {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token");
      }
      return authService.getProtectedData(token);
    },
    enabled: !!getAccessToken(),
    retry: 1,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
