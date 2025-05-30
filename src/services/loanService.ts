
import { apiClient } from './apiClient';
import { Loan, LoanRepayment, ApiResponse, PaginatedResponse, QueryParams } from '@/types/api';

export class LoanService {
  async getLoans(params?: QueryParams): Promise<PaginatedResponse<Loan>> {
    return apiClient.get<Loan>('/loans', params) as Promise<PaginatedResponse<Loan>>;
  }

  async getLoanById(id: string): Promise<Loan> {
    const response = await apiClient.get<Loan>(`/loans/${id}`) as ApiResponse<Loan>;
    return response.data;
  }

  async createLoan(loanData: Partial<Loan>): Promise<Loan> {
    const response = await apiClient.post<Loan>('/loans', loanData);
    return response.data;
  }

  async updateLoan(id: string, loanData: Partial<Loan>): Promise<Loan> {
    const response = await apiClient.put<Loan>(`/loans/${id}`, loanData);
    return response.data;
  }

  async approveLoan(id: string, notes?: string): Promise<Loan> {
    const response = await apiClient.post<Loan>(`/loans/${id}/approve`, { notes });
    return response.data;
  }

  async rejectLoan(id: string, reason: string): Promise<Loan> {
    const response = await apiClient.post<Loan>(`/loans/${id}/reject`, { reason });
    return response.data;
  }

  async disburseLoan(id: string, disbursementDetails: any): Promise<Loan> {
    const response = await apiClient.post<Loan>(`/loans/${id}/disburse`, disbursementDetails);
    return response.data;
  }

  async getLoansByFarmer(farmerId: string, params?: QueryParams): Promise<PaginatedResponse<Loan>> {
    return apiClient.get<Loan>(`/farmers/${farmerId}/loans`, params) as Promise<PaginatedResponse<Loan>>;
  }

  async getRepaymentSchedule(loanId: string): Promise<LoanRepayment[]> {
    const response = await apiClient.get<LoanRepayment[]>(`/loans/${loanId}/repayments`) as ApiResponse<LoanRepayment[]>;
    return response.data;
  }

  async recordRepayment(loanId: string, repaymentData: Partial<LoanRepayment>): Promise<LoanRepayment> {
    const response = await apiClient.post<LoanRepayment>(`/loans/${loanId}/repayments`, repaymentData);
    return response.data;
  }

  async getOverdueLoans(): Promise<Loan[]> {
    const response = await apiClient.get<Loan[]>('/loans/overdue') as ApiResponse<Loan[]>;
    return response.data;
  }

  async getLoanStats(): Promise<{
    totalLoansCount: number;
    totalLoanAmount: number;
    activeLoansCount: number;
    activeLoanAmount: number;
    overdueLoansCount: number;
    overdueLoanAmount: number;
    defaultRate: number;
  }> {
    const response = await apiClient.get<any>('/loans/stats') as ApiResponse<any>;
    return response.data;
  }

  async calculateLoanEligibility(farmerId: string): Promise<{
    eligible: boolean;
    maxAmount: number;
    recommendedAmount: number;
    creditScore: number;
    factors: string[];
  }> {
    const response = await apiClient.get<any>(`/farmers/${farmerId}/loan-eligibility`) as ApiResponse<any>;
    return response.data;
  }
}

export const loanService = new LoanService();
