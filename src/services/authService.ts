
import { apiClient } from './apiClient';
import { LoginRequest, LoginResponse, RegisterRequest, User, ApiResponse } from '@/types/api';

export class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    
    if (response.success && response.data.token) {
      apiClient.setToken(response.data.token);
    }
    
    return response.data;
  }

  async register(userData: RegisterRequest): Promise<User> {
    const response = await apiClient.post<User>('/auth/register', userData);
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      apiClient.removeToken();
    }
  }

  async refreshToken(): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/refresh');
    
    if (response.success && response.data.token) {
      apiClient.setToken(response.data.token);
    }
    
    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiClient.post('/auth/change-password', {
      currentPassword,
      newPassword
    });
  }

  async resetPassword(email: string): Promise<void> {
    await apiClient.post('/auth/reset-password', { email });
  }

  async confirmResetPassword(token: string, newPassword: string): Promise<void> {
    await apiClient.post('/auth/confirm-reset-password', {
      token,
      newPassword
    });
  }
}

export const authService = new AuthService();
