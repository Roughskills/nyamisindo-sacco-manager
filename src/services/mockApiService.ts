
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
  PaginatedResponse 
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
}

export const mockApiService = new MockApiService();
