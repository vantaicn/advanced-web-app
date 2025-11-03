// Mock API to simulate backend authentication
// This simulates a real backend with JWT tokens

import type {
  AuthResponse,
  LoginCredentials,
  RefreshTokenResponse,
  User,
} from "../types/auth.types";

// Simulated database
const MOCK_USERS = [
  {
    id: "1",
    email: "user@example.com",
    password: "password123",
    name: "John Doe",
  },
  {
    id: "2",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
  },
];

// Generate a mock JWT token (in real app, this would be done by backend)
const generateToken = (userId: string, expiresIn: number): string => {
  const payload = {
    userId,
    exp: Date.now() + expiresIn,
  };
  return btoa(JSON.stringify(payload)); // Base64 encode (not secure, just for demo)
};

// Validate token format and expiration
const validateToken = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token));
    return payload.exp > Date.now();
  } catch {
    return false;
  }
};

// Extract user ID from token
const getUserIdFromToken = (token: string): string | null => {
  try {
    const payload = JSON.parse(atob(token));
    return payload.userId;
  } catch {
    return null;
  }
};

// Simulate network delay
const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  // Login endpoint
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(800); // Simulate network delay

    const user = MOCK_USERS.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Generate tokens (access token expires in 15 minutes, refresh token in 7 days)
    const accessToken = generateToken(user.id, 15 * 60 * 1000); // 15 minutes
    const refreshToken = generateToken(user.id, 7 * 24 * 60 * 60 * 1000); // 7 days

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  },

  // Refresh token endpoint
  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    await delay(300);

    if (!validateToken(refreshToken)) {
      throw new Error("Invalid or expired refresh token");
    }

    const userId = getUserIdFromToken(refreshToken);
    if (!userId) {
      throw new Error("Invalid refresh token");
    }

    // Generate new access token
    const accessToken = generateToken(userId, 15 * 60 * 1000); // 15 minutes

    return {
      accessToken,
    };
  },

  // Get current user endpoint (protected)
  getCurrentUser: async (accessToken: string): Promise<User> => {
    await delay(300);

    if (!validateToken(accessToken)) {
      throw new Error("Invalid or expired access token");
    }

    const userId = getUserIdFromToken(accessToken);
    if (!userId) {
      throw new Error("Invalid access token");
    }

    const user = MOCK_USERS.find((u) => u.id === userId);
    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  },

  // Get protected data endpoint
  getProtectedData: async (
    accessToken: string
  ): Promise<{ message: string; data: any }> => {
    await delay(500);

    if (!validateToken(accessToken)) {
      throw new Error("Invalid or expired access token");
    }

    return {
      message: "This is protected data",
      data: {
        items: [
          { id: 1, title: "Item 1", description: "First protected item" },
          { id: 2, title: "Item 2", description: "Second protected item" },
          { id: 3, title: "Item 3", description: "Third protected item" },
        ],
        timestamp: new Date().toISOString(),
      },
    };
  },
};
