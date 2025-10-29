import axios from "axios";
import { API_BASE_URL } from "../config/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface RegisterData {
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    email: string;
    createdAt: Date;
  };
}

export const registerUser = async (
  data: RegisterData
): Promise<RegisterResponse> => {
  const response = await apiClient.post<RegisterResponse>(
    "/user/register",
    data
  );
  return response.data;
};

export default apiClient;
