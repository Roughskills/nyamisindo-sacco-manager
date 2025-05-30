
import { apiClient } from './apiClient';
import { ReportRequest, ReportResponse, ApiResponse } from '@/types/api';

export class ReportService {
  async generateReport(reportRequest: ReportRequest): Promise<ReportResponse> {
    const response = await apiClient.post<ReportResponse>('/reports/generate', reportRequest);
    return response.data;
  }

  async getReportStatus(reportId: string): Promise<ReportResponse> {
    const response = await apiClient.get<ReportResponse>(`/reports/${reportId}/status`) as ApiResponse<ReportResponse>;
    return response.data;
  }

  async downloadReport(reportId: string): Promise<Blob> {
    const response = await fetch(`${apiClient['baseURL']}/reports/${reportId}/download`, {
      headers: apiClient['getHeaders'](),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.blob();
  }

  async getAvailableReports(): Promise<ReportResponse[]> {
    const response = await apiClient.get<ReportResponse[]>('/reports') as ApiResponse<ReportResponse[]>;
    return response.data;
  }

  async deleteReport(reportId: string): Promise<void> {
    await apiClient.delete(`/reports/${reportId}`);
  }

  // Predefined report shortcuts
  async generateMilkProductionReport(startDate: string, endDate: string, farmerId?: string): Promise<ReportResponse> {
    return this.generateReport({
      type: 'milk_production',
      dateRange: { startDate, endDate },
      filters: farmerId ? { farmerId } : undefined,
      format: 'pdf'
    });
  }

  async generatePaymentReport(startDate: string, endDate: string, farmerId?: string): Promise<ReportResponse> {
    return this.generateReport({
      type: 'payments',
      dateRange: { startDate, endDate },
      filters: farmerId ? { farmerId } : undefined,
      format: 'excel'
    });
  }

  async generateLoanReport(startDate: string, endDate: string): Promise<ReportResponse> {
    return this.generateReport({
      type: 'loans',
      dateRange: { startDate, endDate },
      format: 'excel'
    });
  }

  async generateFarmerReport(district?: string): Promise<ReportResponse> {
    return this.generateReport({
      type: 'farmers',
      dateRange: { startDate: '2020-01-01', endDate: new Date().toISOString().split('T')[0] },
      filters: district ? { district } : undefined,
      format: 'excel'
    });
  }

  async generateFinancialSummary(startDate: string, endDate: string): Promise<ReportResponse> {
    return this.generateReport({
      type: 'financial_summary',
      dateRange: { startDate, endDate },
      format: 'pdf'
    });
  }
}

export const reportService = new ReportService();
