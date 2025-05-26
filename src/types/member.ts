
export interface Member {
  id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  farmArea: string;
  status: "active" | "pending" | "suspended";
  role: "farmer" | "admin" | "manager";
  joinDate: string;
  profileImage: string;
  farmImage: string;
  totalMilkSubmissions: number;
  totalPayments: number;
  processedVouchers: number;
  lastActivity: string;
  nationalId: string;
}
