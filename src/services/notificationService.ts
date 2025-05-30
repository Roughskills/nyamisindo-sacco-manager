
import { apiClient } from './apiClient';
import { Notification, ApiResponse, PaginatedResponse, QueryParams } from '@/types/api';

export class NotificationService {
  async getNotifications(params?: QueryParams): Promise<PaginatedResponse<Notification>> {
    return apiClient.get<Notification>('/notifications', params) as Promise<PaginatedResponse<Notification>>;
  }

  async getUnreadNotifications(): Promise<Notification[]> {
    const response = await apiClient.get<Notification[]>('/notifications/unread');
    return response.data;
  }

  async markAsRead(notificationId: string): Promise<Notification> {
    const response = await apiClient.put<Notification>(`/notifications/${notificationId}/read`);
    return response.data;
  }

  async markAllAsRead(): Promise<void> {
    await apiClient.put('/notifications/mark-all-read');
  }

  async deleteNotification(notificationId: string): Promise<void> {
    await apiClient.delete(`/notifications/${notificationId}`);
  }

  async createNotification(notificationData: Partial<Notification>): Promise<Notification> {
    const response = await apiClient.post<Notification>('/notifications', notificationData);
    return response.data;
  }

  async sendBulkNotification(
    userIds: string[], 
    farmerIds: string[], 
    notificationData: Partial<Notification>
  ): Promise<Notification[]> {
    const response = await apiClient.post<Notification[]>('/notifications/bulk', {
      userIds,
      farmerIds,
      ...notificationData
    });
    return response.data;
  }

  async getNotificationStats(): Promise<{
    total: number;
    unread: number;
    byCategory: Record<string, number>;
    byPriority: Record<string, number>;
  }> {
    const response = await apiClient.get<any>('/notifications/stats');
    return response.data;
  }
}

export const notificationService = new NotificationService();
