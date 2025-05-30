
import { apiClient } from './apiClient';
import { MilkCollection, ApiResponse, PaginatedResponse, QueryParams } from '@/types/api';

export class MilkCollectionService {
  async getCollections(params?: QueryParams): Promise<PaginatedResponse<MilkCollection>> {
    return apiClient.get<MilkCollection>('/milk-collections', params) as Promise<PaginatedResponse<MilkCollection>>;
  }

  async getCollectionById(id: string): Promise<MilkCollection> {
    const response = await apiClient.get<MilkCollection>(`/milk-collections/${id}`);
    return response.data;
  }

  async createCollection(collectionData: Partial<MilkCollection>): Promise<MilkCollection> {
    const response = await apiClient.post<MilkCollection>('/milk-collections', collectionData);
    return response.data;
  }

  async updateCollection(id: string, collectionData: Partial<MilkCollection>): Promise<MilkCollection> {
    const response = await apiClient.put<MilkCollection>(`/milk-collections/${id}`, collectionData);
    return response.data;
  }

  async deleteCollection(id: string): Promise<void> {
    await apiClient.delete(`/milk-collections/${id}`);
  }

  async approveCollection(id: string): Promise<MilkCollection> {
    const response = await apiClient.post<MilkCollection>(`/milk-collections/${id}/approve`);
    return response.data;
  }

  async rejectCollection(id: string, reason: string): Promise<MilkCollection> {
    const response = await apiClient.post<MilkCollection>(`/milk-collections/${id}/reject`, { reason });
    return response.data;
  }

  async getCollectionsByFarmer(farmerId: string, params?: QueryParams): Promise<PaginatedResponse<MilkCollection>> {
    return apiClient.get<MilkCollection>(`/farmers/${farmerId}/milk-collections`, params) as Promise<PaginatedResponse<MilkCollection>>;
  }

  async getCollectionsByDateRange(startDate: string, endDate: string): Promise<MilkCollection[]> {
    const response = await apiClient.get<MilkCollection[]>('/milk-collections/date-range', {
      startDate,
      endDate
    });
    return response.data;
  }

  async getDailyProductionStats(date: string): Promise<{
    totalQuantity: number;
    averageQuality: string;
    totalFarmers: number;
    totalAmount: number;
  }> {
    const response = await apiClient.get<any>(`/milk-collections/daily-stats/${date}`);
    return response.data;
  }

  async getMonthlyProductionStats(year: number, month: number): Promise<{
    totalQuantity: number;
    averageQuality: string;
    totalFarmers: number;
    totalAmount: number;
    dailyBreakdown: Array<{
      date: string;
      quantity: number;
      quality: string;
      farmers: number;
    }>;
  }> {
    const response = await apiClient.get<any>(`/milk-collections/monthly-stats/${year}/${month}`);
    return response.data;
  }
}

export const milkCollectionService = new MilkCollectionService();
