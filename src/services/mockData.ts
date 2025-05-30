
import { 
  User, 
  Farmer, 
  MilkCollection, 
  Payment, 
  Loan, 
  Notification, 
  Role, 
  Permission 
} from '@/types/api';

// Mock Permissions
export const mockPermissions: Permission[] = [
  { id: '1', name: 'Employee Management', resource: 'users', action: 'manage', description: 'Manage system users and employees' },
  { id: '2', name: 'User Privileges', resource: 'roles', action: 'manage', description: 'Manage user roles and permissions' },
  { id: '3', name: 'General Control', resource: 'system', action: 'view', description: 'General system access' },
  { id: '4', name: 'Loans Control', resource: 'loans', action: 'manage', description: 'Manage farmer loans' },
  { id: '5', name: 'Accounts Control', resource: 'accounts', action: 'manage', description: 'Manage farmer accounts' },
  { id: '6', name: 'API Channels', resource: 'api', action: 'access', description: 'Access API endpoints' },
  { id: '7', name: 'Reports Access', resource: 'reports', action: 'view', description: 'View and generate reports' },
  { id: '8', name: 'System Configuration', resource: 'config', action: 'manage', description: 'Configure system settings' }
];

// Mock Roles
export const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Super Admin',
    description: 'Full system access',
    permissions: mockPermissions
  },
  {
    id: '2',
    name: 'Manager',
    description: 'Management level access',
    permissions: mockPermissions.slice(0, 6)
  },
  {
    id: '3',
    name: 'Operator',
    description: 'Operational level access',
    permissions: mockPermissions.slice(2, 5)
  },
  {
    id: '4',
    name: 'Viewer',
    description: 'Read-only access',
    permissions: [mockPermissions[2], mockPermissions[6]]
  }
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@cooperative.com',
    firstName: 'John',
    lastName: 'Admin',
    phone: '+250788123456',
    role: mockRoles[0],
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    lastLoginAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    email: 'manager@cooperative.com',
    firstName: 'Mary',
    lastName: 'Manager',
    phone: '+250788234567',
    role: mockRoles[1],
    status: 'active',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-14T15:20:00Z',
    lastLoginAt: '2024-01-14T15:20:00Z'
  }
];

// Mock Farmers
export const mockFarmers: Farmer[] = [
  {
    id: '1',
    personalInfo: {
      firstName: 'Jean',
      lastName: 'Muhire',
      nationalId: '1198780123456789',
      phone: '+250788123456',
      email: 'jean.muhire@example.com',
      dateOfBirth: '1987-05-15',
      gender: 'male'
    },
    address: {
      district: 'Gasabo',
      sector: 'Kinyinya',
      cell: 'Kagugu',
      village: 'Nyamirambo',
      coordinates: {
        latitude: -1.9441,
        longitude: 30.0619
      }
    },
    farmInfo: {
      farmSize: 2.5,
      numberOfCows: 15,
      farmingExperience: 10,
      farmType: 'dairy'
    },
    membershipInfo: {
      membershipId: 'MEM001',
      joinDate: '2023-01-15',
      status: 'active',
      membershipType: 'individual'
    },
    financialInfo: {
      totalEarnings: 850000,
      totalLoans: 200000,
      creditScore: 750,
      paymentMethod: 'airtel',
      accountDetails: '075XXXXXXX'
    },
    documents: {
      profilePhoto: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face',
      nationalIdPhoto: 'https://example.com/id.jpg',
      farmPhoto: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=300&h=200&fit=crop',
      kycStatus: 'verified'
    },
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  }
];

// Mock Milk Collections
export const mockMilkCollections: MilkCollection[] = [
  {
    id: '1',
    farmerId: '1',
    farmer: mockFarmers[0],
    collectionDate: '2024-01-15',
    morningCollection: {
      quantity: 25,
      quality: 'A',
      temperature: 4.5,
      density: 1.030,
      fatContent: 3.8,
      collectedBy: 'Collector 1',
      collectionTime: '06:30:00'
    },
    eveningCollection: {
      quantity: 20,
      quality: 'A',
      temperature: 4.2,
      density: 1.028,
      fatContent: 3.6,
      collectedBy: 'Collector 2',
      collectionTime: '18:30:00'
    },
    totalQuantity: 45,
    averageQuality: 'A',
    pricePerLiter: 800,
    totalAmount: 36000,
    status: 'approved',
    createdAt: '2024-01-15T06:30:00Z',
    updatedAt: '2024-01-15T18:30:00Z'
  }
];

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: '1',
    farmerId: '1',
    farmer: mockFarmers[0],
    amount: 45000,
    paymentType: 'milk_payment',
    paymentMethod: 'airtel',
    paymentDetails: {
      reference: 'AM123456789',
      phoneNumber: '075XXXXXXX'
    },
    status: 'completed',
    description: 'Monthly milk payment',
    processedDate: '2024-01-15T10:00:00Z',
    createdBy: '1',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

// Mock Loans
export const mockLoans: Loan[] = [
  {
    id: '1',
    farmerId: '1',
    farmer: mockFarmers[0],
    loanType: 'equipment',
    principalAmount: 500000,
    interestRate: 12,
    termMonths: 24,
    monthlyPayment: 23537,
    totalAmount: 564888,
    status: 'active',
    applicationDate: '2024-01-01',
    approvalDate: '2024-01-05',
    disbursementDate: '2024-01-10',
    dueDate: '2024-12-31',
    collateral: 'Farm equipment and cattle',
    repayments: [],
    createdBy: '1',
    approvedBy: '2',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'info',
    category: 'milk_collection',
    title: 'New Milk Collection',
    message: 'Farmer Jean Muhire has submitted today\'s milk collection',
    isRead: false,
    priority: 'medium',
    actionRequired: true,
    actionUrl: '/milk-collections/1',
    createdAt: '2024-01-15T06:30:00Z'
  },
  {
    id: '2',
    farmerId: '1',
    type: 'success',
    category: 'payment',
    title: 'Payment Processed',
    message: 'Your milk payment of UGX 45,000 has been processed successfully',
    isRead: false,
    priority: 'high',
    createdAt: '2024-01-15T10:00:00Z'
  }
];
