
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Users, TrendingUp, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MemberCard from "./MemberCard";
import { Member } from "../types/member";

const membersData: Member[] = [
  {
    id: "M001",
    name: "John Doe",
    phone: "+256 701 234567",
    email: "john.doe@email.com",
    location: "Kampala, Uganda",
    farmArea: "5 acres",
    status: "active",
    role: "farmer",
    joinDate: "2024-01-15",
    profileImage: "/lovable-uploads/32cc625f-c0ad-42ea-ade9-1bf9d73d9ed0.png",
    farmImage: "/lovable-uploads/38792e50-48c0-4f46-92fc-820a2ff1f442.png",
    totalMilkSubmissions: 1250,
    totalPayments: 750000,
    processedVouchers: 15,
    lastActivity: "2024-12-15",
    nationalId: "CM12345678901234"
  },
  {
    id: "M002",
    name: "Jane Smith",
    phone: "+256 702 345678",
    email: "jane.smith@email.com",
    location: "Entebbe, Uganda",
    farmArea: "3 acres",
    status: "active",
    role: "farmer",
    joinDate: "2024-02-20",
    profileImage: "/lovable-uploads/39bf3300-da67-4e46-aa6e-89ee8efaba00.png",
    farmImage: "/lovable-uploads/a6cc8166-7f4f-4c47-8f1d-9c59e88de71d.png",
    totalMilkSubmissions: 980,
    totalPayments: 590000,
    processedVouchers: 12,
    lastActivity: "2024-12-14",
    nationalId: "CM12345678901235"
  },
  {
    id: "M003",
    name: "Alice Johnson",
    phone: "+256 703 456789",
    email: "alice.johnson@email.com",
    location: "Jinja, Uganda",
    farmArea: "7 acres",
    status: "active",
    role: "farmer",
    joinDate: "2024-01-10",
    profileImage: "/lovable-uploads/40e63c42-bf7a-4837-82b2-a3ed1de37147.png",
    farmImage: "/lovable-uploads/b4951201-dc96-4e91-ba61-eff2d06fa51e.png",
    totalMilkSubmissions: 1650,
    totalPayments: 990000,
    processedVouchers: 20,
    lastActivity: "2024-12-16",
    nationalId: "CM12345678901236"
  },
  {
    id: "M004",
    name: "Bob Williams",
    phone: "+256 704 567890",
    email: "bob.williams@email.com",
    location: "Mbarara, Uganda",
    farmArea: "4 acres",
    status: "pending",
    role: "farmer",
    joinDate: "2024-03-05",
    profileImage: "/lovable-uploads/4f5c5c7a-a091-4327-a01f-8a9ed50b0e17.png",
    farmImage: "/lovable-uploads/c09eb5a0-bc8a-48bf-a0bb-906aebc779a6.png",
    totalMilkSubmissions: 820,
    totalPayments: 492000,
    processedVouchers: 8,
    lastActivity: "2024-12-10",
    nationalId: "CM12345678901237"
  },
  {
    id: "M005",
    name: "Charlie Brown",
    phone: "+256 705 678901",
    email: "charlie.brown@email.com",
    location: "Gulu, Uganda",
    farmArea: "6 acres",
    status: "active",
    role: "farmer",
    joinDate: "2024-02-12",
    profileImage: "/lovable-uploads/5270e3a7-68c7-4872-8bb8-3577295649b2.png",
    farmImage: "/lovable-uploads/dbe686ba-9d10-447b-9e30-97453f740382.png",
    totalMilkSubmissions: 1380,
    totalPayments: 828000,
    processedVouchers: 16,
    lastActivity: "2024-12-13",
    nationalId: "CM12345678901238"
  }
];

const FarmerList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const filteredMembers = membersData.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeMembers = membersData.filter(member => member.status === "active").length;
  const totalFarmArea = membersData.reduce((total, member) => total + parseInt(member.farmArea), 0);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-green-800">Individual Production Analysis</h2>
          <p className="text-gray-600">Track member profiles and analytics information</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => window.location.href = '/add-farmer'}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-white shadow-md border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{membersData.length}</div>
            <p className="text-sm text-gray-500">Registered members</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Members
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeMembers}</div>
            <p className="text-sm text-gray-500">Currently active</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Farm Area</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFarmArea} acres</div>
            <p className="text-sm text-gray-500">Combined area</p>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Search members by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 shadow-sm"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-500" />
        </div>
      </div>

      {/* Members List */}
      <div className="space-y-4">
        {filteredMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default FarmerList;
