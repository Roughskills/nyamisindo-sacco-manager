
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Milk, 
  Banknote, 
  FileText,
  Settings,
  UserX,
  Eye,
  Edit,
  PiggyBank,
  TrendingUp,
  Award
} from "lucide-react";
import { Member } from "../types/member";
import MemberDetailsModal from "./MemberDetailsModal";
import MemberActionsDropdown from "./MemberActionsDropdown";

interface MemberCardProps {
  member: Member;
}

const MemberCard = ({ member }: MemberCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

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

  // Calculate mock values for the new fields
  const totalSavings = member.totalPayments * 0.15; // 15% of total payments as savings
  const dailySaving = totalSavings / 365; // Daily average
  const distributionScore = Math.min(95, Math.floor(70 + (member.totalMilkSubmissions / 100))); // Score based on submissions

  return (
    <>
      <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="grid grid-cols-12 gap-6 items-center">
            {/* Profile Section - 3 columns */}
            <div className="col-span-3 flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={member.profileImage} alt={member.name} />
                  <AvatarFallback className="bg-green-100 text-green-800 font-semibold text-lg">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Badge 
                  className={`absolute -bottom-1 -right-1 text-xs ${getStatusColor(member.status)}`}
                >
                  {member.status}
                </Badge>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <Badge className={getRoleColor(member.role)}>
                    {member.role}
                  </Badge>
                </div>
                
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>ID: {member.id}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>{member.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Location - 2 columns */}
            <div className="col-span-2">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <Mail className="w-3 h-3" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-3 h-3 text-blue-500" />
                  <span>{member.location}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Calendar className="w-3 h-3" />
                  <span>Farm: {member.farmArea}</span>
                </div>
              </div>
            </div>

            {/* Primary Stats - 3 columns */}
            <div className="col-span-3 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Milk className="w-4 h-4 text-blue-600 mr-1" />
                </div>
                <p className="text-lg font-semibold text-blue-600">{member.totalMilkSubmissions}L</p>
                <p className="text-xs text-gray-600">Total Milk</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Banknote className="w-4 h-4 text-green-600 mr-1" />
                </div>
                <p className="text-lg font-semibold text-green-600">
                  {formatCurrency(member.totalPayments)}
                </p>
                <p className="text-xs text-gray-600">Total Payments</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <FileText className="w-4 h-4 text-orange-600 mr-1" />
                </div>
                <p className="text-lg font-semibold text-orange-600">{member.processedVouchers}</p>
                <p className="text-xs text-gray-600">Vouchers</p>
              </div>
            </div>

            {/* New Financial Stats - 2 columns */}
            <div className="col-span-2 grid grid-cols-2 gap-3">
              <div className="text-center bg-green-50 p-2 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <PiggyBank className="w-4 h-4 text-green-600 mr-1" />
                </div>
                <p className="text-base font-semibold text-green-600">
                  {formatCurrency(totalSavings)}
                </p>
                <p className="text-xs text-gray-600">Total Savings</p>
              </div>
              
              <div className="text-center bg-blue-50 p-2 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp className="w-4 h-4 text-blue-600 mr-1" />
                </div>
                <p className="text-base font-semibold text-blue-600">
                  {formatCurrency(dailySaving)}
                </p>
                <p className="text-xs text-gray-600">Daily Saving</p>
              </div>
            </div>

            {/* Distribution Score & Actions - 2 columns */}
            <div className="col-span-2 flex items-center justify-between">
              <div className="text-center bg-purple-50 p-3 rounded-lg flex-1 mr-3">
                <div className="flex items-center justify-center mb-1">
                  <Award className="w-4 h-4 text-purple-600 mr-1" />
                </div>
                <p className="text-xl font-bold text-purple-600">{distributionScore}%</p>
                <p className="text-xs text-gray-600">Distribution Score</p>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetails(true)}
                  className="flex items-center gap-1 text-xs"
                >
                  <Eye className="w-3 h-3" />
                  View Details
                </Button>
                
                <MemberActionsDropdown member={member} />
              </div>
            </div>
          </div>

          {/* Last Activity Row */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                <Calendar className="w-3 h-3 inline mr-1" />
                Joined: {new Date(member.joinDate).toLocaleDateString()}
              </span>
              <span className="text-gray-600">
                Last Activity: {new Date(member.lastActivity).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <MemberDetailsModal 
        member={member} 
        open={showDetails} 
        onOpenChange={setShowDetails} 
      />
    </>
  );
};

export default MemberCard;
