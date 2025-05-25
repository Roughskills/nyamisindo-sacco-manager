
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Banknote, Milk, Percent, DollarSign, Users, MapPin, Square } from "lucide-react";

const FarmerList = () => {
  const farmers = [
    {
      id: 1,
      name: "John Muhire",
      phone: "+250 788 123 456",
      location: "Kigali, Gasabo District",
      farmArea: "2.5 hectares (25,000 m²)",
      todayMilk: 25,
      monthlyTotal: 720,
      status: "active",
      lastSubmission: "6:30 AM",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face",
      distributionScore: 92,
      loanAmount: 500000
    },
    {
      id: 2,
      name: "Mary Uwimana",
      phone: "+250 788 234 567",
      location: "Nyagatare, Eastern Province",
      farmArea: "1.8 hectares (18,000 m²)",
      todayMilk: 0,
      monthlyTotal: 650,
      status: "pending",
      lastSubmission: "Yesterday",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
      distributionScore: 78,
      loanAmount: 300000
    },
    {
      id: 3,
      name: "Peter Nkusi",
      phone: "+250 788 345 678",
      location: "Muhanga, Southern Province",
      farmArea: "3.2 hectares (32,000 m²)",
      todayMilk: 18,
      monthlyTotal: 580,
      status: "active",
      lastSubmission: "7:15 AM",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face",
      distributionScore: 85,
      loanAmount: 200000
    },
    {
      id: 4,
      name: "Grace Mukamana",
      phone: "+250 788 456 789",
      location: "Musanze, Northern Province",
      farmArea: "2.1 hectares (21,000 m²)",
      todayMilk: 22,
      monthlyTotal: 695,
      status: "active",
      lastSubmission: "6:45 AM",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=150&h=150&fit=crop&crop=face",
      distributionScore: 88,
      loanAmount: 750000
    },
    {
      id: 5,
      name: "David Kayitare",
      phone: "+250 788 567 890",
      location: "Rwamagana, Eastern Province",
      farmArea: "1.5 hectares (15,000 m²)",
      todayMilk: 15,
      monthlyTotal: 445,
      status: "active",
      lastSubmission: "8:00 AM",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face",
      distributionScore: 73,
      loanAmount: 150000
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">Farmer Management</h2>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">Add New Farmer</Button>
      </div>
      
      <div className="grid gap-4">
        {farmers.map((farmer) => (
          <Card key={farmer.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={farmer.image} alt={farmer.name} />
                    <AvatarFallback className="bg-green-100 text-green-800 font-semibold">
                      {farmer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{farmer.name}</h3>
                    <p className="text-sm text-gray-600">{farmer.phone}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-blue-500" />
                      <p className="text-xs text-gray-600">{farmer.location}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Square className="w-3 h-3 text-green-500" />
                      <p className="text-xs text-gray-600">{farmer.farmArea}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Milk className="w-4 h-4 text-blue-600 mr-1" />
                    </div>
                    <p className="text-2xl font-bold text-green-600">{farmer.todayMilk}L</p>
                    <p className="text-xs text-gray-600">Today</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Milk className="w-4 h-4 text-blue-600 mr-1" />
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{farmer.monthlyTotal}L</p>
                    <p className="text-xs text-gray-600">This Month</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Banknote className="w-4 h-4 text-green-600 mr-1" />
                    </div>
                    <p className="text-lg font-semibold text-green-600">150,000 UGX</p>
                    <p className="text-xs text-gray-600">Total Saving Amount</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Percent className="w-4 h-4 text-purple-600 mr-1" />
                    </div>
                    <p className="text-lg font-semibold text-purple-600">{farmer.distributionScore}%</p>
                    <p className="text-xs text-gray-600">Distribution Score</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <DollarSign className="w-4 h-4 text-orange-600 mr-1" />
                    </div>
                    <p className="text-lg font-semibold text-orange-600">{formatCurrency(farmer.loanAmount)}</p>
                    <p className="text-xs text-gray-600">Loan Amount</p>
                  </div>
                  <div className="text-center">
                    <Badge 
                      variant={farmer.status === 'active' ? 'default' : 'secondary'}
                      className={farmer.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {farmer.status}
                    </Badge>
                    <p className="text-xs text-gray-600 mt-1">{farmer.lastSubmission}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FarmerList;
