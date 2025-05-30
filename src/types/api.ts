export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message?: string;
  error?: string;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  [key: string]: any;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  role: Role;
  permissions: Permission[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface Farmer {
  id: string;
  name: string;
  phoneNumber: string;
  address: string;
  district: string;
  membershipInfo: {
    status: 'active' | 'inactive' | 'pending';
    dateJoined: string;
  };
  milkProduction: {
    dailyAverage: number;
    totalProduction: number;
  };
  loanInfo?: {
    loanAmount: number;
    loanStatus: 'pending' | 'approved' | 'rejected';
  };
  paymentInfo?: {
    accountNumber: string;
    paymentHistory: Payment[];
  };
  documents?: {
    nationalId?: string;
    landTitle?: string;
  };
  kycInfo?: {
    status: 'pending' | 'verified' | 'rejected';
    notes?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface MilkCollection {
  id: string;
  farmerId: string;
  quantity: number;
  date: string;
  quality: 'good' | 'average' | 'poor';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  farmerId: string;
  amount: number;
  date: string;
  method: 'mobile_money' | 'bank_transfer' | 'cash';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Loan {
  id: string;
  farmerId: string;
  amount: number;
  interestRate: number;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'disbursed' | 'repaid';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId?: string;
  farmerId?: string;
  title: string;
  message: string;
  type: 'general' | 'milk_collection' | 'payment' | 'loan' | 'system';
  priority: 'high' | 'medium' | 'low';
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ReportRequest {
  type:
    | 'milk_production'
    | 'payments'
    | 'loans'
    | 'farmers'
    | 'financial_summary';
  dateRange: {
    startDate: string;
    endDate: string;
  };
  filters?: {
    farmerId?: string;
    district?: string;
  };
  format: 'pdf' | 'excel';
}

export interface ReportResponse {
  id: string;
  type: ReportRequest['type'];
  dateRange: ReportRequest['dateRange'];
  filters?: ReportRequest['filters'];
  format: ReportRequest['format'];
  status: 'pending' | 'processing' | 'completed' | 'failed';
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW' | 'LOGIN' | 'LOGOUT' | 'EXPORT' | 'IMPORT';
  resource: string; // e.g., 'farmer', 'user', 'payment', 'loan'
  resourceId?: string;
  resourceName?: string; // human-readable name of the resource
  details?: string; // additional details about the action
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
}

export interface AuditLogFilters {
  userId?: string;
  action?: AuditLog['action'];
  resource?: string;
  startDate?: string;
  endDate?: string;
  ipAddress?: string;
}
