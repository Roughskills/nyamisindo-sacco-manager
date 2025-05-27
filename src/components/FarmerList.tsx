import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Users, TrendingUp, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AddCollectionModal from "./AddCollectionModal";

interface Farmer {
  id: number;
  name: string;
  milkProduction: number;
  lastSubmission: string;
  quality: "High" | "Medium" | "Low";
}

const farmersData: Farmer[] = [
  {
    id: 1,
    name: "John Doe",
    milkProduction: 65,
    lastSubmission: "2024-03-15",
    quality: "High",
  },
  {
    id: 2,
    name: "Jane Smith",
    milkProduction: 50,
    lastSubmission: "2024-03-15",
    quality: "Medium",
  },
  {
    id: 3,
    name: "Alice Johnson",
    milkProduction: 72,
    lastSubmission: "2024-03-14",
    quality: "High",
  },
  {
    id: 4,
    name: "Bob Williams",
    milkProduction: 45,
    lastSubmission: "2024-03-14",
    quality: "Low",
  },
  {
    id: 5,
    name: "Charlie Brown",
    milkProduction: 58,
    lastSubmission: "2024-03-13",
    quality: "Medium",
  },
];

const FarmerList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const filteredFarmers = farmersData.filter((farmer) =>
    farmer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmission = () => {
    toast({
      title: "Milk Submission",
      description: "Successfully recorded milk submission!",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-green-800">Milk Analytics</h2>
          <p className="text-gray-600">Track farmer submissions and milk production</p>
        </div>
        <div className="flex gap-2">
          <AddCollectionModal />
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
            <p className="text-sm text-gray-500">Active farmers</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Milk Production
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {farmersData.reduce((acc, farmer) => acc + farmer.milkProduction, 0) /
                farmersData.length}
              L
            </div>
            <p className="text-sm text-gray-500">Per day</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Submission</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Today</div>
            <p className="text-sm text-gray-500">Most recent</p>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Search farmers..."
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
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Milk Production
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Submission
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quality
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFarmers.map((farmer) => (
              <tr key={farmer.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {farmer.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {farmer.milkProduction} L
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {farmer.lastSubmission}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Badge
                    className={
                      farmer.quality === "High"
                        ? "bg-green-100 text-green-800"
                        : farmer.quality === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {farmer.quality}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="outline"
                    onClick={handleSubmission}
                    className="bg-blue-500 text-white hover:bg-blue-700"
                  >
                    Record Submission
                  </Button>
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
