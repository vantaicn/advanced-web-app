// Auth provider that initializes auth state on app load

import { useEffect, useState } from "react";
import { tokenStorage } from "../lib/tokenStorage";
import { mockApi } from "../services/mockApi";
import { setAccessToken } from "../lib/axios";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Try to restore session on app load
    const initAuth = async () => {
      const refreshToken = tokenStorage.getRefreshToken();

      if (refreshToken) {
        try {
          // Try to get new access token using refresh token
          const response = await mockApi.refreshToken(refreshToken);
          setAccessToken(response.accessToken);
        } catch (error) {
          // Refresh token is invalid, clear it
          tokenStorage.clearTokens();
          setAccessToken(null);
        }
      }

      setIsInitialized(true);
    };

    initAuth();
  }, []);

  if (!isInitialized) {
    return (
      <div style={styles.container}>
        <div style={styles.spinner} />
        <p style={styles.text}>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid rgba(255, 255, 255, 0.3)",
    borderTop: "4px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  text: {
    marginTop: "16px",
    color: "white",
    fontSize: "16px",
  },
};
