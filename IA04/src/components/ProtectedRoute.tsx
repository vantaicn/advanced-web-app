// Protected route component that redirects to login if not authenticated

import { Navigate } from "react-router-dom";
import { getAccessToken } from "../lib/axios";
import { tokenStorage } from "../lib/tokenStorage";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const accessToken = getAccessToken();
  const refreshToken = tokenStorage.getRefreshToken();

  // If no tokens, redirect to login
  if (!accessToken && !refreshToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
