
import { apiClient } from './apiClient';
import { Farmer, ApiResponse, PaginatedResponse, QueryParams } from '@/types/api';

export class FarmerService {
  async getFarmers(params?: QueryParams): Promise<PaginatedResponse<Farmer>> {
    return apiClient.get<Farmer>('/farmers', params) as Promise<PaginatedResponse<Farmer>>;
  }

  async getFarmerById(id: string): Promise<Farmer> {
    const response = await apiClient.get<Farmer>(`/farmers/${id}`);
    return response.data;
  }

  async createFarmer(farmerData: Partial<Farmer>): Promise<Farmer> {
    const response = await apiClient.post<Farmer>('/farmers', farmerData);
    return response.data;
  }

  async updateFarmer(id: string, farmerData: Partial<Farmer>): Promise<Farmer> {
    const response = await apiClient.put<Farmer>(`/farmers/${id}`, farmerData);
    return response.data;
  }

  async deleteFarmer(id: string): Promise<void> {
    await apiClient.delete(`/farmers/${id}`);
  }

  async updateFarmerStatus(id: string, status: Farmer['membershipInfo']['status']): Promise<Farmer> {
    const response = await apiClient.put<Farmer>(`/farmers/${id}/status`, { status });
    return response.data;
  }

  async uploadFarmerDocument(id: string, documentType: string, file: File): Promise<Farmer> {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('documentType', documentType);
    
    const response = await apiClient.upload<Farmer>(`/farmers/${id}/documents`, formData);
    return response.data;
  }

  async updateKYCStatus(id: string, status: 'pending' | 'verified' | 'rejected', notes?: string): Promise<Farmer> {
    const response = await apiClient.put<Farmer>(`/farmers/${id}/kyc`, { status, notes });
    return response.data;
  }

  async getFarmersByDistrict(district: string): Promise<Farmer[]> {
    const response = await apiClient.get<Farmer[]>(`/farmers/by-district/${district}`);
    return response.data;
  }

  async searchFarmers(query: string): Promise<Farmer[]> {
    const response = await apiClient.get<Farmer[]>('/farmers/search', { search: query });
    return response.data;
  }
}

export const farmerService = new FarmerService();
