
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Milk, 
  Banknote, 
  FileText,
  CreditCard,
  Activity,
  Square
} from "lucide-react";
import { Member } from "../types/member";

interface MemberDetailsModalProps {
  member: Member;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MemberDetailsModal = ({ member, open, onOpenChange }: MemberDetailsModalProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-purple-100 text-purple-800";
      case "manager": return "bg-blue-100 text-blue-800";
      case "farmer": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Mock recent activities
  const recentActivities = [
    { date: "2025-01-15", activity: "Milk submission", amount: "25L", type: "milk" },
    { date: "2025-01-14", activity: "Payment received", amount: "50,000 UGX", type: "payment" },
    { date: "2025-01-13", activity: "Voucher processed", amount: "Voucher #V001", type: "voucher" },
    { date: "2025-01-12", activity: "Milk submission", amount: "23L", type: "milk" },
    { date: "2025-01-11", activity: "Payment received", amount: "45,000 UGX", type: "payment" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <User className="w-6 h-6 text-green-600" />
            Member Details - {member.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={member.profileImage} alt={member.name} />
                    <AvatarFallback className="bg-green-100 text-green-800 font-semibold text-xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <div className="flex justify-center gap-2 mt-2">
                    <Badge className={getStatusColor(member.status)}>
                      {member.status}
                    </Badge>
                    <Badge className={getRoleColor(member.role)}>
                      {member.role}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">ID:</span>
                    <span>{member.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">National ID:</span>
                    <span>{member.nationalId}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Phone:</span>
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Email:</span>
                    <span className="text-blue-600">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Location:</span>
                    <span>{member.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Farm Area:</span>
                    <span>{member.farmArea}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Joined:</span>
                    <span>{new Date(member.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Farm Image */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Farm Photo</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src={member.farmImage} 
                  alt="Farm area" 
                  className="w-full h-32 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </div>

          {/* Statistics and Activities */}
          <div className="lg:col-span-2 space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Milk className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">{member.totalMilkSubmissions}L</p>
                  <p className="text-sm text-gray-600">Total Milk Submissions</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Banknote className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(member.totalPayments)}
                  </p>
                  <p className="text-sm text-gray-600">Total Payments</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <FileText className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-orange-600">{member.processedVouchers}</p>
                  <p className="text-sm text-gray-600">Processed Vouchers</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-600">
                    {new Date(member.lastActivity).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">Last Activity</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          activity.type === 'milk' ? 'bg-blue-500' :
                          activity.type === 'payment' ? 'bg-green-500' :
                          'bg-orange-500'
                        }`} />
                        <div>
                          <p className="font-medium text-sm">{activity.activity}</p>
                          <p className="text-xs text-gray-600">{activity.date}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {activity.amount}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemberDetailsModal;
