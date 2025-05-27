
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
        <CardContent className="p-8">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Profile Section */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-start space-y-4">
              <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                  <AvatarImage src={member.profileImage} alt={member.name} />
                  <AvatarFallback className="bg-green-100 text-green-800 font-semibold text-xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Badge 
                  className={`absolute -bottom-2 -right-2 text-xs px-2 py-1 ${getStatusColor(member.status)}`}
                >
                  {member.status}
                </Badge>
              </div>
              
              <div className="text-center lg:text-left space-y-2">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <Badge className={`${getRoleColor(member.role)} text-xs`}>
                    {member.role}
                  </Badge>
                </div>
                
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <User className="w-4 h-4" />
                    <span>ID: {member.id}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Contact Details</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-gray-700">{member.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span className="text-gray-700">{member.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-purple-500 flex-shrink-0" />
                  <span className="text-gray-700">Farm: {member.farmArea}</span>
                </div>
              </div>
            </div>

            {/* Primary Statistics */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Performance Stats</h4>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Milk className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-800">Total Milk</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{member.totalMilkSubmissions}L</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Banknote className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-800">Total Payments</span>
                  </div>
                  <p className="text-lg font-bold text-green-600">
                    {formatCurrency(member.totalPayments)}
                  </p>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center mb-2">
                    <FileText className="w-5 h-5 text-orange-600 mr-2" />
                    <span className="text-sm font-medium text-orange-800">Vouchers</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{member.processedVouchers}</p>
                </div>
              </div>
            </div>

            {/* Financial Analytics */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Financial Analytics</h4>
              <div className="space-y-4">
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <div className="flex items-center justify-center mb-2">
                    <PiggyBank className="w-5 h-5 text-emerald-600 mr-2" />
                    <span className="text-sm font-medium text-emerald-800">Total Savings</span>
                  </div>
                  <p className="text-xl font-bold text-emerald-600 text-center">
                    {formatCurrency(totalSavings)}
                  </p>
                </div>
                
                <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="w-5 h-5 text-cyan-600 mr-2" />
                    <span className="text-sm font-medium text-cyan-800">Daily Saving</span>
                  </div>
                  <p className="text-lg font-bold text-cyan-600 text-center">
                    {formatCurrency(dailySaving)}
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-center mb-2">
                    <Award className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="text-sm font-medium text-purple-800">Distribution Score</span>
                  </div>
                  <p className="text-3xl font-bold text-purple-600 text-center">{distributionScore}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex flex-col lg:flex-row gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined: {new Date(member.joinDate).toLocaleDateString()}</span>
                </div>
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
