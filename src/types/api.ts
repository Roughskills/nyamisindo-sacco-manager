
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
  startDate?: string;
  endDate?: string;
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
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
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
  resource: string;
  action: string;
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
  expiresIn: number;
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
  personalInfo: {
    firstName: string;
    lastName: string;
    nationalId: string;
    phone: string;
    email?: string;
    dateOfBirth: string;
    gender: 'male' | 'female';
  };
  address: {
    district: string;
    sector: string;
    cell: string;
    village: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  farmInfo: {
    farmSize: number;
    numberOfCows: number;
    farmingExperience: number;
    farmType: 'dairy' | 'mixed' | 'other';
  };
  membershipInfo: {
    membershipId: string;
    joinDate: string;
    status: 'active' | 'inactive' | 'pending';
    membershipType: 'individual' | 'group';
  };
  financialInfo: {
    totalEarnings: number;
    totalLoans: number;
    creditScore: number;
    paymentMethod: 'airtel' | 'mtn' | 'bank' | 'cash';
    accountDetails: string;
  };
  documents: {
    profilePhoto?: string;
    nationalIdPhoto?: string;
    farmPhoto?: string;
    kycStatus: 'pending' | 'verified' | 'rejected';
  };
  createdAt: string;
  updatedAt: string;
}

export interface MilkCollection {
  id: string;
  farmerId: string;
  farmer: Farmer;
  collectionDate: string;
  morningCollection?: {
    quantity: number;
    quality: 'A' | 'B' | 'C';
    temperature: number;
    density: number;
    fatContent: number;
    collectedBy: string;
    collectionTime: string;
  };
  eveningCollection?: {
    quantity: number;
    quality: 'A' | 'B' | 'C';
    temperature: number;
    density: number;
    fatContent: number;
    collectedBy: string;
    collectionTime: string;
  };
  totalQuantity: number;
  averageQuality: 'A' | 'B' | 'C';
  pricePerLiter: number;
  totalAmount: number;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  farmerId: string;
  farmer: Farmer;
  amount: number;
  paymentType: 'milk_payment' | 'loan_repayment' | 'bonus' | 'penalty';
  paymentMethod: 'airtel' | 'mtn' | 'bank' | 'cash';
  paymentDetails: {
    reference?: string;
    phoneNumber?: string;
    accountNumber?: string;
  };
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description?: string;
  processedDate?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Loan {
  id: string;
  farmerId: string;
  farmer: Farmer;
  loanType: 'equipment' | 'feed' | 'emergency' | 'development';
  principalAmount: number;
  interestRate: number;
  termMonths: number;
  monthlyPayment: number;
  totalAmount: number;
  status: 'pending' | 'approved' | 'rejected' | 'disbursed' | 'repaid';
  applicationDate: string;
  approvalDate?: string;
  disbursementDate?: string;
  dueDate: string;
  collateral?: string;
  repayments: LoanRepayment[];
  createdBy: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoanRepayment {
  id: string;
  loanId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue';
  paymentMethod?: 'airtel' | 'mtn' | 'bank' | 'cash';
  reference?: string;
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
  category: 'info' | 'success' | 'warning' | 'error';
  priority: 'high' | 'medium' | 'low';
  isRead: boolean;
  readAt?: string;
  actionRequired?: boolean;
  actionUrl?: string;
  createdAt: string;
  updatedAt?: string;
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
  expiresAt: string;
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
