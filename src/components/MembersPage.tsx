
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Search, Filter } from "lucide-react";
import MemberCard from "./MemberCard";
import MemberFilters from "./MemberFilters";
import { Member } from "../types/member";

const MembersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    role: "all",
    location: "all",
    dateRange: "all"
  });

  // Mock data - in real app this would come from API
  const members: Member[] = [
    {
      id: "MEM001",
      name: "John Muhire",
      phone: "+250 788 123 456",
      email: "john.muhire@example.com",
      location: "Kigali, Gasabo District",
      farmArea: "2.5 hectares (25,000 m²)",
      status: "active",
      role: "farmer",
      joinDate: "2023-01-15",
      profileImage: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face",
      farmImage: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=300&h=200&fit=crop",
      totalMilkSubmissions: 720,
      totalPayments: 850000,
      processedVouchers: 12,
      lastActivity: "2025-01-15",
      nationalId: "1198780123456789"
    },
    {
      id: "MEM002",
      name: "Mary Uwimana",
      phone: "+250 788 234 567",
      email: "mary.uwimana@example.com",
      location: "Nyagatare, Eastern Province",
      farmArea: "1.8 hectares (18,000 m²)",
      status: "pending",
      role: "farmer",
      joinDate: "2023-03-20",
      profileImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
      farmImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop",
      totalMilkSubmissions: 650,
      totalPayments: 720000,
      processedVouchers: 8,
      lastActivity: "2025-01-10",
      nationalId: "1199280123456789"
    },
    {
      id: "MEM003",
      name: "Peter Nkusi",
      phone: "+250 788 345 678",
      email: "peter.nkusi@example.com",
      location: "Muhanga, Southern Province",
      farmArea: "3.2 hectares (32,000 m²)",
      status: "active",
      role: "admin",
      joinDate: "2022-11-10",
      profileImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face",
      farmImage: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=300&h=200&fit=crop",
      totalMilkSubmissions: 580,
      totalPayments: 920000,
      processedVouchers: 15,
      lastActivity: "2025-01-14",
      nationalId: "1197580123456789"
    },
    {
      id: "MEM004",
      name: "Grace Mukamana",
      phone: "+250 788 456 789",
      email: "grace.mukamana@example.com",
      location: "Musanze, Northern Province",
      farmArea: "2.1 hectares (21,000 m²)",
      status: "suspended",
      role: "farmer",
      joinDate: "2023-05-08",
      profileImage: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=150&h=150&fit=crop&crop=face",
      farmImage: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop",
      totalMilkSubmissions: 695,
      totalPayments: 780000,
      processedVouchers: 10,
      lastActivity: "2024-12-20",
      nationalId: "1199880123456789"
    }
  ];

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.phone.includes(searchTerm) ||
                         member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filters.status === "all" || member.status === filters.status;
    const matchesRole = filters.role === "all" || member.role === filters.role;
    const matchesLocation = filters.location === "all" || member.location.toLowerCase().includes(filters.location.toLowerCase());

    return matchesSearch && matchesStatus && matchesRole && matchesLocation;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-green-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Member Management</h2>
            <p className="text-gray-600">Manage cooperative members and their activities</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            Add New Member
          </Button>
        </div>
      </div>

      {/* Search and Stats */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name, phone, email, or member ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4 ml-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{members.length}</p>
                <p className="text-sm text-gray-600">Total Members</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {members.filter(m => m.status === "active").length}
                </p>
                <p className="text-sm text-gray-600">Active</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {members.filter(m => m.status === "pending").length}
                </p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </div>

          {showFilters && (
            <MemberFilters filters={filters} setFilters={setFilters} />
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredMembers.length} of {members.length} members
        </p>
        {searchTerm && (
          <Button 
            variant="ghost" 
            onClick={() => setSearchTerm("")}
            className="text-sm"
          >
            Clear search
          </Button>
        )}
      </div>

      {/* Members List */}
      <div className="space-y-4">
        {filteredMembers.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
              <p className="text-gray-600">
                {searchTerm ? "Try adjusting your search criteria" : "No members match the current filters"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))
        )}
      </div>
    </div>
  );
};

export default MembersPage;
