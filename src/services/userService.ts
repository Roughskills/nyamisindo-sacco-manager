
import { apiClient } from './apiClient';
import { User, Role, Permission, ApiResponse, PaginatedResponse, QueryParams } from '@/types/api';

export class UserService {
  async getUsers(params?: QueryParams): Promise<PaginatedResponse<User>> {
    return apiClient.get<User>('/users', params) as Promise<PaginatedResponse<User>>;
  }

  async getUserById(id: string): Promise<User> {
    const response = await apiClient.get<User>(`/users/${id}`) as ApiResponse<User>;
    return response.data;
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const response = await apiClient.post<User>('/users', userData);
    return response.data;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const response = await apiClient.put<User>(`/users/${id}`, userData);
    return response.data;
  }

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  }

  async activateUser(id: string): Promise<User> {
    const response = await apiClient.post<User>(`/users/${id}/activate`);
    return response.data;
  }

  async deactivateUser(id: string): Promise<User> {
    const response = await apiClient.post<User>(`/users/${id}/deactivate`);
    return response.data;
  }

  // Role management
  async getRoles(): Promise<Role[]> {
    const response = await apiClient.get<Role[]>('/roles') as ApiResponse<Role[]>;
    return response.data;
  }

  async createRole(roleData: Partial<Role>): Promise<Role> {
    const response = await apiClient.post<Role>('/roles', roleData);
    return response.data;
  }

  async updateRole(id: string, roleData: Partial<Role>): Promise<Role> {
    const response = await apiClient.put<Role>(`/roles/${id}`, roleData);
    return response.data;
  }

  async deleteRole(id: string): Promise<void> {
    await apiClient.delete(`/roles/${id}`);
  }

  // Permission management
  async getPermissions(): Promise<Permission[]> {
    const response = await apiClient.get<Permission[]>('/permissions') as ApiResponse<Permission[]>;
    return response.data;
  }

  async assignRoleToUser(userId: string, roleId: string): Promise<User> {
    const response = await apiClient.post<User>(`/users/${userId}/roles/${roleId}`);
    return response.data;
  }

  async removeRoleFromUser(userId: string, roleId: string): Promise<User> {
    const response = await apiClient.delete<User>(`/users/${userId}/roles/${roleId}`);
    return response.data;
  }
}

export const userService = new UserService();
