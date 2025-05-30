import { 
  LoginRequest, 
  LoginResponse, 
  User, 
  Farmer, 
  MilkCollection, 
  Payment, 
  Loan, 
  Notification,
  Role,
  ApiResponse,
  PaginatedResponse,
  AuditLog,
  AuditLogFilters 
} from '@/types/api';
import { 
  mockUsers, 
  mockFarmers, 
  mockMilkCollections, 
  mockPayments, 
  mockLoans, 
  mockNotifications,
  mockRoles 
} from './mockData';

// Mock audit logs data
const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    userId: '1',
    user: { id: '1', name: 'John Doe', email: 'john@cooperative.rw' },
    action: 'LOGIN',
    resource: 'authentication',
    resourceId: '1',
    resourceName: 'User Login',
    details: 'Successful login via web interface',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    changes: []
  },
  {
    id: '2',
    userId: '1',
    user: { id: '1', name: 'John Doe', email: 'john@cooperative.rw' },
    action: 'VIEW',
    resource: 'farmer',
    resourceId: '1',
    resourceName: 'Jean Baptiste Uwimana',
    details: 'Viewed farmer profile and details',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    changes: []
  },
  {
    id: '3',
    userId: '2',
    user: { id: '2', name: 'Jane Smith', email: 'jane@cooperative.rw' },
    action: 'CREATE',
    resource: 'milk-collection',
    resourceId: '3',
    resourceName: 'Morning Collection - 15L',
    details: 'Created new milk collection record',
    ipAddress: '192.168.1.105',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    changes: [
      { field: 'quantity', oldValue: null, newValue: 15 },
      { field: 'quality', oldValue: null, newValue: 'A' },
      { field: 'farmerId', oldValue: null, newValue: '1' }
    ]
  },
  {
    id: '4',
    userId: '1',
    user: { id: '1', name: 'John Doe', email: 'john@cooperative.rw' },
    action: 'UPDATE',
    resource: 'payment',
    resourceId: '1',
    resourceName: 'Payment to Jean Baptiste',
    details: 'Updated payment status from pending to completed',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    changes: [
      { field: 'status', oldValue: 'pending', newValue: 'completed' },
      { field: 'processedDate', oldValue: null, newValue: new Date().toISOString() }
    ]
  },
  {
    id: '5',
    userId: '3',
    user: { id: '3', name: 'Admin User', email: 'admin@cooperative.rw' },
    action: 'CREATE',
    resource: 'user',
    resourceId: '4',
    resourceName: 'New Staff Member',
    details: 'Created new user account for staff member',
    ipAddress: '192.168.1.110',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    changes: [
      { field: 'firstName', oldValue: null, newValue: 'Alice' },
      { field: 'lastName', oldValue: null, newValue: 'Johnson' },
      { field: 'email', oldValue: null, newValue: 'alice@cooperative.rw' },
      { field: 'role', oldValue: null, newValue: 'staff' }
    ]
  },
  {
    id: '6',
    userId: '2',
    user: { id: '2', name: 'Jane Smith', email: 'jane@cooperative.rw' },
    action: 'EXPORT',
    resource: 'report',
    resourceId: 'milk-production-2024',
    resourceName: 'Milk Production Report 2024',
    details: 'Exported milk production report for January 2024',
    ipAddress: '192.168.1.105',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    changes: []
  },
  {
    id: '7',
    userId: '1',
    user: { id: '1', name: 'John Doe', email: 'john@cooperative.rw' },
    action: 'DELETE',
    resource: 'notification',
    resourceId: '5',
    resourceName: 'System Maintenance Notice',
    details: 'Deleted outdated system maintenance notification',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    changes: [
      { field: 'status', oldValue: 'active', newValue: 'deleted' }
    ]
  },
  {
    id: '8',
    userId: '3',
    user: { id: '3', name: 'Admin User', email: 'admin@cooperative.rw' },
    action: 'UPDATE',
    resource: 'farmer',
    resourceId: '2',
    resourceName: 'Marie Mukamana',
    details: 'Updated farmer contact information',
    ipAddress: '192.168.1.110',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
    timestamp: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    changes: [
      { field: 'phone', oldValue: '+250781234567', newValue: '+250781234568' },
      { field: 'email', oldValue: null, newValue: 'marie@farmer.rw' }
    ]
  },
  {
    id: '9',
    userId: '2',
    user: { id: '2', name: 'Jane Smith', email: 'jane@cooperative.rw' },
    action: 'VIEW',
    resource: 'loan',
    resourceId: '1',
    resourceName: 'Equipment Loan - Jean Baptiste',
    details: 'Reviewed loan application details',
    ipAddress: '192.168.1.105',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    timestamp: new Date(Date.now() - 150 * 60 * 1000).toISOString(),
    changes: []
  },
  {
    id: '10',
    userId: '1',
    user: { id: '1', name: 'John Doe', email: 'john@cooperative.rw' },
    action: 'LOGOUT',
    resource: 'authentication',
    resourceId: '1',
    resourceName: 'User Logout',
    details: 'User logged out of the system',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    changes: []
  }
];

// This service simulates API responses for development
export class MockApiService {
  private delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    await this.delay();
    
    const user = mockUsers.find(u => u.email === credentials.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    return {
      token: 'mock-jwt-token-' + Date.now(),
      user,
      expiresIn: 3600
    };
  }

  async getCurrentUser(): Promise<User> {
    await this.delay();
    return mockUsers[0];
  }

  // User endpoints
  async getUsers(page: number = 1, limit: number = 10): Promise<PaginatedResponse<User>> {
    await this.delay();
    
    return {
      success: true,
      data: mockUsers,
      pagination: {
        page,
        limit,
        total: mockUsers.length,
        totalPages: Math.ceil(mockUsers.length / limit)
      }
    };
  }

  async getRoles(): Promise<Role[]> {
    await this.delay();
    return mockRoles;
  }

  // Farmer endpoints
  async getFarmers(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Farmer>> {
    await this.delay();
    
    return {
      success: true,
      data: mockFarmers,
      pagination: {
        page,
        limit,
        total: mockFarmers.length,
        totalPages: Math.ceil(mockFarmers.length / limit)
      }
    };
  }

  async getFarmerById(id: string): Promise<Farmer> {
    await this.delay();
    
    const farmer = mockFarmers.find(f => f.id === id);
    if (!farmer) {
      throw new Error('Farmer not found');
    }
    
    return farmer;
  }

  // Milk Collection endpoints
  async getMilkCollections(page: number = 1, limit: number = 10): Promise<PaginatedResponse<MilkCollection>> {
    await this.delay();
    
    return {
      success: true,
      data: mockMilkCollections,
      pagination: {
        page,
        limit,
        total: mockMilkCollections.length,
        totalPages: Math.ceil(mockMilkCollections.length / limit)
      }
    };
  }

  async createMilkCollection(data: Partial<MilkCollection>): Promise<MilkCollection> {
    await this.delay();
    
    const newCollection: MilkCollection = {
      id: String(mockMilkCollections.length + 1),
      farmerId: data.farmerId || '1',
      farmer: mockFarmers[0],
      collectionDate: data.collectionDate || new Date().toISOString().split('T')[0],
      morningCollection: data.morningCollection,
      eveningCollection: data.eveningCollection,
      totalQuantity: (data.morningCollection?.quantity || 0) + (data.eveningCollection?.quantity || 0),
      averageQuality: data.morningCollection?.quality || 'A',
      pricePerLiter: 800,
      totalAmount: ((data.morningCollection?.quantity || 0) + (data.eveningCollection?.quantity || 0)) * 800,
      status: 'pending',
      notes: data.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockMilkCollections.push(newCollection);
    return newCollection;
  }

  // Payment endpoints
  async getPayments(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Payment>> {
    await this.delay();
    
    return {
      success: true,
      data: mockPayments,
      pagination: {
        page,
        limit,
        total: mockPayments.length,
        totalPages: Math.ceil(mockPayments.length / limit)
      }
    };
  }

  async createPayment(data: Partial<Payment>): Promise<Payment> {
    await this.delay();
    
    const newPayment: Payment = {
      id: String(mockPayments.length + 1),
      farmerId: data.farmerId || '1',
      farmer: mockFarmers[0],
      amount: data.amount || 0,
      paymentType: data.paymentType || 'milk_payment',
      paymentMethod: data.paymentMethod || 'airtel',
      paymentDetails: data.paymentDetails || { reference: 'REF' + Date.now() },
      status: 'pending',
      description: data.description || '',
      createdBy: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockPayments.push(newPayment);
    return newPayment;
  }

  // Loan endpoints
  async getLoans(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Loan>> {
    await this.delay();
    
    return {
      success: true,
      data: mockLoans,
      pagination: {
        page,
        limit,
        total: mockLoans.length,
        totalPages: Math.ceil(mockLoans.length / limit)
      }
    };
  }

  // Notification endpoints
  async getNotifications(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Notification>> {
    await this.delay();
    
    return {
      success: true,
      data: mockNotifications,
      pagination: {
        page,
        limit,
        total: mockNotifications.length,
        totalPages: Math.ceil(mockNotifications.length / limit)
      }
    };
  }

  async markNotificationAsRead(id: string): Promise<Notification> {
    await this.delay();
    
    const notification = mockNotifications.find(n => n.id === id);
    if (!notification) {
      throw new Error('Notification not found');
    }
    
    notification.isRead = true;
    notification.readAt = new Date().toISOString();
    
    return notification;
  }

  // Audit Log endpoints
  async getAuditLogs(params?: any): Promise<PaginatedResponse<AuditLog>> {
    await this.delay();
    
    let filteredLogs = [...mockAuditLogs];
    
    // Apply filters
    if (params?.action) {
      filteredLogs = filteredLogs.filter(log => log.action === params.action);
    }
    
    if (params?.resource) {
      filteredLogs = filteredLogs.filter(log => log.resource === params.resource);
    }
    
    if (params?.search) {
      const searchTerm = params.search.toLowerCase();
      filteredLogs = filteredLogs.filter(log => 
        log.user.name.toLowerCase().includes(searchTerm) ||
        log.user.email.toLowerCase().includes(searchTerm) ||
        log.resource.toLowerCase().includes(searchTerm) ||
        (log.resourceName && log.resourceName.toLowerCase().includes(searchTerm)) ||
        (log.details && log.details.toLowerCase().includes(searchTerm))
      );
    }
    
    if (params?.startDate) {
      filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) >= new Date(params.startDate));
    }
    
    if (params?.endDate) {
      filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) <= new Date(params.endDate));
    }
    
    // Sort by timestamp (newest first)
    filteredLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedLogs = filteredLogs.slice(startIndex, endIndex);
    
    return {
      success: true,
      data: paginatedLogs,
      pagination: {
        page,
        limit,
        total: filteredLogs.length,
        totalPages: Math.ceil(filteredLogs.length / limit)
      }
    };
  }

  async getAuditStats(filters?: AuditLogFilters): Promise<any> {
    await this.delay();
    
    let filteredLogs = [...mockAuditLogs];
    
    // Apply filters
    if (filters?.action) {
      filteredLogs = filteredLogs.filter(log => log.action === filters.action);
    }
    
    if (filters?.resource) {
      filteredLogs = filteredLogs.filter(log => log.resource === filters.resource);
    }
    
    if (filters?.startDate) {
      filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) >= new Date(filters.startDate!));
    }
    
    if (filters?.endDate) {
      filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) <= new Date(filters.endDate!));
    }
    
    // Calculate stats
    const actionsByType: Record<string, number> = {};
    const actionsByResource: Record<string, number> = {};
    const actionsByUser: Record<string, number> = {};
    
    filteredLogs.forEach(log => {
      actionsByType[log.action] = (actionsByType[log.action] || 0) + 1;
      actionsByResource[log.resource] = (actionsByResource[log.resource] || 0) + 1;
      actionsByUser[log.user.name] = (actionsByUser[log.user.name] || 0) + 1;
    });
    
    return {
      totalActions: filteredLogs.length,
      actionsByType,
      actionsByResource,
      actionsByUser,
      actionsOverTime: [] // Could be implemented for time-based charts
    };
  }
}

export const mockApiService = new MockApiService();
