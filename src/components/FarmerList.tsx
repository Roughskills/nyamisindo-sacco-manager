
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const FarmerList = () => {
  const farmers = [
    {
      id: 1,
      name: "John Muhire",
      phone: "+250 788 123 456",
      todayMilk: 25,
      monthlyTotal: 720,
      status: "active",
      lastSubmission: "6:30 AM"
    },
    {
      id: 2,
      name: "Mary Uwimana",
      phone: "+250 788 234 567",
      todayMilk: 0,
      monthlyTotal: 650,
      status: "pending",
      lastSubmission: "Yesterday"
    },
    {
      id: 3,
      name: "Peter Nkusi",
      phone: "+250 788 345 678",
      todayMilk: 18,
      monthlyTotal: 580,
      status: "active",
      lastSubmission: "7:15 AM"
    },
    {
      id: 4,
      name: "Grace Mukamana",
      phone: "+250 788 456 789",
      todayMilk: 22,
      monthlyTotal: 695,
      status: "active",
      lastSubmission: "6:45 AM"
    },
    {
      id: 5,
      name: "David Kayitare",
      phone: "+250 788 567 890",
      todayMilk: 15,
      monthlyTotal: 445,
      status: "active",
      lastSubmission: "8:00 AM"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Farmer Management</h2>
        <Button className="bg-green-600 hover:bg-green-700">Add New Farmer</Button>
      </div>
      
      <div className="grid gap-4">
        {farmers.map((farmer) => (
          <Card key={farmer.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-green-100 text-green-800 font-semibold">
                      {farmer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{farmer.name}</h3>
                    <p className="text-sm text-gray-600">{farmer.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{farmer.todayMilk}L</p>
                    <p className="text-xs text-gray-600">Today</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{farmer.monthlyTotal}L</p>
                    <p className="text-xs text-gray-600">This Month</p>
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
