
import { apiClient } from './apiClient';
import { Payment, ApiResponse, PaginatedResponse, QueryParams } from '@/types/api';

export class PaymentService {
  async getPayments(params?: QueryParams): Promise<PaginatedResponse<Payment>> {
    return apiClient.get<Payment>('/payments', params) as Promise<PaginatedResponse<Payment>>;
  }

  async getPaymentById(id: string): Promise<Payment> {
    const response = await apiClient.get<Payment>(`/payments/${id}`) as ApiResponse<Payment>;
    return response.data;
  }

  async createPayment(paymentData: Partial<Payment>): Promise<Payment> {
    const response = await apiClient.post<Payment>('/payments', paymentData);
    return response.data;
  }

  async updatePayment(id: string, paymentData: Partial<Payment>): Promise<Payment> {
    const response = await apiClient.put<Payment>(`/payments/${id}`, paymentData);
    return response.data;
  }

  async cancelPayment(id: string, reason: string): Promise<Payment> {
    const response = await apiClient.post<Payment>(`/payments/${id}/cancel`, { reason });
    return response.data;
  }

  async processPayment(id: string): Promise<Payment> {
    const response = await apiClient.post<Payment>(`/payments/${id}/process`);
    return response.data;
  }

  async retryPayment(id: string): Promise<Payment> {
    const response = await apiClient.post<Payment>(`/payments/${id}/retry`);
    return response.data;
  }

  async getPaymentsByFarmer(farmerId: string, params?: QueryParams): Promise<PaginatedResponse<Payment>> {
    return apiClient.get<Payment>(`/farmers/${farmerId}/payments`, params) as Promise<PaginatedResponse<Payment>>;
  }

  async bulkCreatePayments(payments: Partial<Payment>[]): Promise<Payment[]> {
    const response = await apiClient.post<Payment[]>('/payments/bulk', { payments });
    return response.data;
  }

  async getPaymentStats(startDate: string, endDate: string): Promise<{
    totalAmount: number;
    totalCount: number;
    successRate: number;
    byMethod: Record<string, { amount: number; count: number }>;
    byStatus: Record<string, { amount: number; count: number }>;
  }> {
    const response = await apiClient.get<any>('/payments/stats', { startDate, endDate }) as ApiResponse<any>;
    return response.data;
  }

  async reconcilePayments(date: string): Promise<{
    matched: number;
    unmatched: number;
    discrepancies: Array<{
      paymentId: string;
      expectedAmount: number;
      actualAmount: number;
      reference: string;
    }>;
  }> {
    const response = await apiClient.post<any>(`/payments/reconcile/${date}`) as ApiResponse<any>;
    return response.data;
  }
}

export const paymentService = new PaymentService();
