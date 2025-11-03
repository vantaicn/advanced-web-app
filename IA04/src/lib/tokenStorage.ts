// Token storage utilities

const REFRESH_TOKEN_KEY = "refreshToken";

export const tokenStorage = {
  // Store refresh token in localStorage
  setRefreshToken: (token: string): void => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  // Get refresh token from localStorage
  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  // Remove refresh token from localStorage
  removeRefreshToken: (): void => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  // Clear all tokens
  clearTokens: (): void => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};
