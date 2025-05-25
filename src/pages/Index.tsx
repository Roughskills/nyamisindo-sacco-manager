
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardStats from "@/components/DashboardStats";
import MilkProductionChart from "@/components/MilkProductionChart";
import FarmerList from "@/components/FarmerList";
import LoanTracker from "@/components/LoanTracker";
import Navigation from "@/components/Navigation";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Nyamisindo SACCO Management System
          </h1>
          <p className="text-lg text-gray-600">
            Dairy Cooperative Management & Milk Production Tracking
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="font-medium">Dashboard</TabsTrigger>
            <TabsTrigger value="farmers" className="font-medium">Farmers</TabsTrigger>
            <TabsTrigger value="loans" className="font-medium">Loans</TabsTrigger>
            <TabsTrigger value="payments" className="font-medium">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 mt-6">
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MilkProductionChart />
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-green-800">Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">John Muhire - Milk Submission</p>
                        <p className="text-sm text-gray-600">25 liters • Today 6:30 AM</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">+5,000 RWF</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Mary Uwimana - Loan Payment</p>
                        <p className="text-sm text-gray-600">Monthly installment</p>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">-15,000 RWF</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Peter Nkusi - Milk Submission</p>
                        <p className="text-sm text-gray-600">18 liters • Today 7:15 AM</p>
                      </div>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">+3,600 RWF</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="farmers" className="mt-6">
            <FarmerList />
          </TabsContent>

          <TabsContent value="loans" className="mt-6">
            <LoanTracker />
          </TabsContent>

          <TabsContent value="payments" className="mt-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-green-800">Payment Management</CardTitle>
                <CardDescription>Track and process farmer payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Processing</h3>
                  <p className="text-gray-600 mb-6">Advanced payment features coming soon</p>
                  <Button className="bg-green-600 hover:bg-green-700">Configure Payments</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
