
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
      <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300 bg-white">
        <CardContent className="p-6">
          
          {/* First Row - Profile and Contact Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Profile Section */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                  <AvatarImage src={member.profileImage} alt={member.name} />
                  <AvatarFallback className="bg-green-100 text-green-800 font-semibold text-lg">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Badge 
                  className={`absolute -bottom-1 -right-1 text-xs px-2 py-1 ${getStatusColor(member.status)}`}
                >
                  {member.status}
                </Badge>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`${getRoleColor(member.role)} text-xs`}>
                    {member.role}
                  </Badge>
                  <span className="text-sm text-gray-600">ID: {member.id}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Farm: {member.farmArea}</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-blue-500" />
                <span className="text-gray-700">{member.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-green-500" />
                <span className="text-gray-700 truncate">{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="text-gray-700">{member.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-purple-500" />
                <span className="text-gray-700">Joined: {new Date(member.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Second Row - Performance Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6 py-4 border-y border-gray-200">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="flex items-center justify-center mb-1">
                <Milk className="w-4 h-4 text-blue-600 mr-1" />
                <span className="text-xs font-medium text-blue-800">Total Milk</span>
              </div>
              <p className="text-lg font-bold text-blue-600">{member.totalMilkSubmissions}L</p>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="flex items-center justify-center mb-1">
                <Banknote className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-xs font-medium text-green-800">Payments</span>
              </div>
              <p className="text-sm font-bold text-green-600">
                {formatCurrency(member.totalPayments)}
              </p>
            </div>
            
            <div className="bg-orange-50 p-3 rounded-lg text-center">
              <div className="flex items-center justify-center mb-1">
                <FileText className="w-4 h-4 text-orange-600 mr-1" />
                <span className="text-xs font-medium text-orange-800">Vouchers</span>
              </div>
              <p className="text-lg font-bold text-orange-600">{member.processedVouchers}</p>
            </div>

            <div className="bg-emerald-50 p-3 rounded-lg text-center">
              <div className="flex items-center justify-center mb-1">
                <PiggyBank className="w-4 h-4 text-emerald-600 mr-1" />
                <span className="text-xs font-medium text-emerald-800">Total Savings</span>
              </div>
              <p className="text-sm font-bold text-emerald-600">
                {formatCurrency(totalSavings)}
              </p>
            </div>
            
            <div className="bg-cyan-50 p-3 rounded-lg text-center">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="w-4 h-4 text-cyan-600 mr-1" />
                <span className="text-xs font-medium text-cyan-800">Daily Saving</span>
              </div>
              <p className="text-sm font-bold text-cyan-600">
                {formatCurrency(dailySaving)}
              </p>
            </div>
            
            <div className="bg-purple-50 p-3 rounded-lg text-center">
              <div className="flex items-center justify-center mb-1">
                <Award className="w-4 h-4 text-purple-600 mr-1" />
                <span className="text-xs font-medium text-purple-800">Distribution</span>
              </div>
              <p className="text-lg font-bold text-purple-600">{distributionScore}%</p>
            </div>
          </div>

          {/* Third Row - Footer with Actions */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Last Activity: {new Date(member.lastActivity).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDetails(true)}
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Details
              </Button>
              
              <MemberActionsDropdown member={member} />
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
