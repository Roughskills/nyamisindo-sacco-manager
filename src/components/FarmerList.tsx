
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Users, TrendingUp, Calendar, Phone, MapPin, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Farmer {
  id: number;
  name: string;
  phone: string;
  location: string;
  farmSize: string;
  profileImage: string;
  status: "Active" | "Inactive";
  joinDate: string;
}

const farmersData: Farmer[] = [
  {
    id: 1,
    name: "John Doe",
    phone: "+256 701 234567",
    location: "Kampala, Uganda",
    farmSize: "5 acres",
    profileImage: "/lovable-uploads/32cc625f-c0ad-42ea-ade9-1bf9d73d9ed0.png",
    status: "Active",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "+256 702 345678",
    location: "Entebbe, Uganda",
    farmSize: "3 acres",
    profileImage: "/lovable-uploads/39bf3300-da67-4e46-aa6e-89ee8efaba00.png",
    status: "Active",
    joinDate: "2024-02-20",
  },
  {
    id: 3,
    name: "Alice Johnson",
    phone: "+256 703 456789",
    location: "Jinja, Uganda",
    farmSize: "7 acres",
    profileImage: "/lovable-uploads/40e63c42-bf7a-4837-82b2-a3ed1de37147.png",
    status: "Active",
    joinDate: "2024-01-10",
  },
  {
    id: 4,
    name: "Bob Williams",
    phone: "+256 704 567890",
    location: "Mbarara, Uganda",
    farmSize: "4 acres",
    profileImage: "/lovable-uploads/4f5c5c7a-a091-4327-a01f-8a9ed50b0e17.png",
    status: "Inactive",
    joinDate: "2024-03-05",
  },
  {
    id: 5,
    name: "Charlie Brown",
    phone: "+256 705 678901",
    location: "Gulu, Uganda",
    farmSize: "6 acres",
    profileImage: "/lovable-uploads/5270e3a7-68c7-4872-8bb8-3577295649b2.png",
    status: "Active",
    joinDate: "2024-02-12",
  },
];

const FarmerList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const filteredFarmers = farmersData.filter((farmer) =>
    farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    farmer.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-green-800">Milk Analytics</h2>
          <p className="text-gray-600">Track farmer profiles and member information</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => window.location.href = '/add-farmer'}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Farmer
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-white shadow-md border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{farmersData.length}</div>
            <p className="text-sm text-gray-500">Registered farmers</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Farmers
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {farmersData.filter(farmer => farmer.status === "Active").length}
            </div>
            <p className="text-sm text-gray-500">Currently active</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Farm Area</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {farmersData.reduce((total, farmer) => total + parseInt(farmer.farmSize), 0)} acres
            </div>
            <p className="text-sm text-gray-500">Combined area</p>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Search farmers by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 shadow-sm"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-500" />
        </div>
      </div>

      {/* Farmers List */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Farmer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Farm Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFarmers.map((farmer) => (
              <tr key={farmer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={farmer.profileImage} alt={farmer.name} />
                      <AvatarFallback className="bg-green-100 text-green-800">
                        {farmer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{farmer.name}</div>
                      <div className="text-sm text-gray-500">ID: {farmer.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    {farmer.phone}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    {farmer.location}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {farmer.farmSize}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    className={
                      farmer.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {farmer.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FarmerList;
