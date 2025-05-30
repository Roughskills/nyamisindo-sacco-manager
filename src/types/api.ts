
// Authentication types
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
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
}

// User and Role types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: Role;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
  description?: string;
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
  description?: string;
}

// Member/Farmer types
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
    farmSize: number; // in hectares
    numberOfCows: number;
    farmingExperience: number; // in years
    farmType: 'dairy' | 'mixed' | 'crop';
  };
  membershipInfo: {
    membershipId: string;
    joinDate: string;
    status: 'active' | 'pending' | 'suspended' | 'terminated';
    membershipType: 'individual' | 'group';
  };
  financialInfo: {
    totalEarnings: number;
    totalLoans: number;
    creditScore?: number;
    paymentMethod: 'airtel' | 'mtn' | 'bank';
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

// Milk Collection types
export interface MilkCollection {
  id: string;
  farmerId: string;
  farmer: Farmer;
  collectionDate: string;
  morningCollection: {
    quantity: number; // in liters
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

// Payment types
export interface Payment {
  id: string;
  farmerId: string;
  farmer: Farmer;
  amount: number;
  paymentType: 'milk_payment' | 'loan_disbursement' | 'bonus' | 'other';
  paymentMethod: 'airtel' | 'mtn' | 'bank';
  paymentDetails: {
    reference: string;
    phoneNumber?: string;
    bankAccount?: string;
    bankName?: string;
  };
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  description: string;
  scheduledDate?: string;
  processedDate?: string;
  failureReason?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Loan types
export interface Loan {
  id: string;
  farmerId: string;
  farmer: Farmer;
  loanType: 'equipment' | 'feed' | 'emergency' | 'expansion';
  principalAmount: number;
  interestRate: number;
  termMonths: number;
  monthlyPayment: number;
  totalAmount: number;
  status: 'pending' | 'approved' | 'disbursed' | 'active' | 'completed' | 'defaulted';
  applicationDate: string;
  approvalDate?: string;
  disbursementDate?: string;
  dueDate: string;
  collateral?: string;
  guarantor?: {
    name: string;
    phone: string;
    nationalId: string;
  };
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
}

// Account types
export interface Account {
  id: string;
  farmerId: string;
  farmer: Farmer;
  accountNumber: string;
  accountType: 'savings' | 'loan' | 'shares';
  balance: number;
  status: 'active' | 'inactive' | 'frozen';
  openedDate: string;
  lastTransactionDate?: string;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  accountId: string;
  type: 'credit' | 'debit';
  category: 'milk_payment' | 'loan_disbursement' | 'loan_repayment' | 'fee' | 'bonus' | 'withdrawal';
  amount: number;
  balance: number;
  description: string;
  reference?: string;
  date: string;
  createdBy: string;
}

// Notification types
export interface Notification {
  id: string;
  userId?: string;
  farmerId?: string;
  type: 'info' | 'warning' | 'error' | 'success';
  category: 'payment' | 'loan' | 'milk_collection' | 'system' | 'announcement';
  title: string;
  message: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionRequired?: boolean;
  actionUrl?: string;
  createdAt: string;
  readAt?: string;
}

// Report types
export interface ReportRequest {
  type: 'milk_production' | 'payments' | 'loans' | 'farmers' | 'financial_summary';
  dateRange: {
    startDate: string;
    endDate: string;
  };
  filters?: {
    farmerId?: string;
    district?: string;
    status?: string;
  };
  format: 'pdf' | 'excel' | 'csv';
}

export interface ReportResponse {
  id: string;
  type: string;
  status: 'generating' | 'completed' | 'failed';
  downloadUrl?: string;
  createdAt: string;
  expiresAt: string;
}

// Audit Log types
export interface AuditLog {
  id: string;
  userId: string;
  user: User;
  action: string;
  resource: string;
  resourceId?: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
}

// Query parameters
export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
  startDate?: string;
  endDate?: string;
}
