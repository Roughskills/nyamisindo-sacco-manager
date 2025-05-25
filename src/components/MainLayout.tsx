import { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";
import FarmerList from "./FarmerList";
import LoanTracker from "./LoanTracker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MainLayout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "farmers":
        return <FarmerList />;
      case "loans":
        return <LoanTracker />;
      case "payments":
        return (
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
        );
      case "members":
        return (
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-green-800">Member Management</CardTitle>
              <CardDescription>Manage cooperative members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Member Management</h3>
                <p className="text-gray-600 mb-6">Member management features coming soon</p>
                <Button className="bg-green-600 hover:bg-green-700">Manage Members</Button>
              </div>
            </CardContent>
          </Card>
        );
      case "settings":
        return (
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-green-800">Settings</CardTitle>
              <CardDescription>System configuration and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">System Settings</h3>
                <p className="text-gray-600 mb-6">Settings panel coming soon</p>
                <Button className="bg-green-600 hover:bg-green-700">Configure Settings</Button>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            {activeTab === "farmers" && (
              <div className="mb-6 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=600&h=300&fit=crop&crop=center" 
                  alt="Milk processing and dairy farming" 
                  className="w-full max-w-2xl mx-auto h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {activeTab === "dashboard" && "Dashboard Overview"}
              {activeTab === "farmers" && "Milk Analytics"}
              {activeTab === "loans" && "Loan Applications"}
              {activeTab === "payments" && "Payment Management"}
              {activeTab === "members" && "Member Management"}
              {activeTab === "settings" && "System Settings"}
            </h1>
            <p className="text-gray-600">
              {activeTab === "dashboard" && "Monitor your cooperative's performance and activities"}
              {activeTab === "farmers" && "Track farmer submissions and milk production analytics"}
              {activeTab === "loans" && "Manage loan applications and approvals"}
              {activeTab === "payments" && "Process and track farmer payments"}
              {activeTab === "members" && "Manage cooperative member information"}
              {activeTab === "settings" && "Configure system settings and preferences"}
            </p>
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
