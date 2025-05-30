
import { apiClient } from './apiClient';
import { AuditLog, AuditLogFilters, ApiResponse, PaginatedResponse, QueryParams } from '@/types/api';

export class AuditService {
  async getAuditLogs(params?: QueryParams & AuditLogFilters): Promise<PaginatedResponse<AuditLog>> {
    return apiClient.get<AuditLog>('/audit-logs', params) as Promise<PaginatedResponse<AuditLog>>;
  }

  async getAuditLogById(id: string): Promise<AuditLog> {
    const response = await apiClient.get<AuditLog>(`/audit-logs/${id}`) as ApiResponse<AuditLog>;
    return response.data;
  }

  async createAuditLog(auditData: Omit<AuditLog, 'id' | 'timestamp' | 'user'>): Promise<AuditLog> {
    const response = await apiClient.post<AuditLog>('/audit-logs', auditData);
    return response.data;
  }

  async getAuditLogsByUser(userId: string, params?: QueryParams): Promise<AuditLog[]> {
    const response = await apiClient.get<AuditLog[]>(`/audit-logs/user/${userId}`, params) as ApiResponse<AuditLog[]>;
    return response.data;
  }

  async getAuditLogsByResource(resource: string, resourceId?: string, params?: QueryParams): Promise<AuditLog[]> {
    const endpoint = resourceId 
      ? `/audit-logs/resource/${resource}/${resourceId}`
      : `/audit-logs/resource/${resource}`;
    const response = await apiClient.get<AuditLog[]>(endpoint, params) as ApiResponse<AuditLog[]>;
    return response.data;
  }

  async exportAuditLogs(filters?: AuditLogFilters): Promise<Blob> {
    const response = await fetch(`${apiClient['baseURL']}/audit-logs/export`, {
      method: 'POST',
      headers: apiClient['getHeaders'](),
      body: JSON.stringify(filters),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.blob();
  }

  async getAuditStats(filters?: AuditLogFilters): Promise<{
    totalActions: number;
    actionsByType: Record<string, number>;
    actionsByResource: Record<string, number>;
    actionsByUser: Record<string, number>;
    actionsOverTime: { date: string; count: number; }[];
  }> {
    const response = await apiClient.post<any>('/audit-logs/stats', filters);
    return response.data;
  }
}

export const auditService = new AuditService();
