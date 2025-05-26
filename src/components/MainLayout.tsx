
import { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";
import FarmerList from "./FarmerList";
import LoanTracker from "./LoanTracker";
import MilkDistributionChart from "./MilkDistributionChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BarChart3, Users, Milk, User, UserPlus, Bell, MessageSquare } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import Chart3D from "./Chart3D";

const MainLayout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const milkImages = [
    {
      src: "/lovable-uploads/5270e3a7-68c7-4872-8bb8-3577295649b2.png",
      alt: "Farmer milking cow"
    },
    {
      src: "/lovable-uploads/40e63c42-bf7a-4837-82b2-a3ed1de37147.png",
      alt: "Dairy cattle in facility"
    },
    {
      src: "/lovable-uploads/08b2cab9-5e75-409e-8e81-f5635c7a2f45.png",
      alt: "Farmer with milk transport"
    },
    {
      src: "/lovable-uploads/b4951201-dc96-4e91-ba61-eff2d06fa51e.png",
      alt: "Milk collection with bicycle"
    },
    {
      src: "/lovable-uploads/9a0581ed-f998-4b6c-8dad-7d6e491be959.png",
      alt: "Traditional milk collection"
    },
    {
      src: "/lovable-uploads/dbe686ba-9d10-447b-9e30-97453f740382.png",
      alt: "Milk processing facility"
    },
    {
      src: "/lovable-uploads/674f3b8b-10d9-41f5-af4a-fe758cb395f1.png",
      alt: "Farmer milking process"
    },
    {
      src: "/lovable-uploads/a9bc0811-c655-4b05-87de-53a9aeb856c9.png",
      alt: "Dairy farming activities"
    },
    {
      src: "/lovable-uploads/4f5c5c7a-a091-4327-a01f-8a9ed50b0e17.png",
      alt: "Milk collection process"
    },
    {
      src: "/lovable-uploads/c59c0326-57bb-49e4-a7eb-6c728579f436.png",
      alt: "Milk processing equipment"
    },
    {
      src: "/lovable-uploads/0271928c-8400-4f47-bbe5-9a7188a1b552.png",
      alt: "Industrial milk processing"
    },
    {
      src: "/lovable-uploads/38792e50-48c0-4f46-92fc-820a2ff1f442.png",
      alt: "Milk testing and quality control"
    },
    {
      src: "/lovable-uploads/e396651b-6075-4523-b675-ed9499f777e9.png",
      alt: "Modern milk processing facility"
    },
    {
      src: "/lovable-uploads/08179d14-0f42-4a80-a6aa-17d79ffe997f.png",
      alt: "Milk processing tanks"
    },
    {
      src: "/lovable-uploads/32cc625f-c0ad-42ea-ade9-1bf9d73d9ed0.png",
      alt: "Professional milk processing"
    },
    {
      src: "/lovable-uploads/aeccd7da-0728-41bc-93cb-fecf909e1dc1.png",
      alt: "Traditional milk handling"
    },
    {
      src: "/lovable-uploads/671a9e5b-a1d2-4808-beec-e66d6f03ae1e.png",
      alt: "Dairy farm structure"
    },
    {
      src: "/lovable-uploads/39bf3300-da67-4e46-aa6e-89ee8efaba00.png",
      alt: "Industrial milk processing equipment"
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "farmers":
        return (
          <div className="flex gap-6">
            <div className="flex-1">
              <FarmerList />
            </div>
            <div className="flex flex-col gap-4 w-96">
              <div className="scale-75 origin-top">
                <MilkDistributionChart />
              </div>
              <div className="scale-75 origin-top">
                <Chart3D />
              </div>
            </div>
          </div>
        );
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
      case "account":
        return (
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-green-800">Account Management</CardTitle>
              <CardDescription>Manage user accounts and profiles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Account Management</h3>
                <p className="text-gray-600 mb-6">Account management features coming soon</p>
                <Button className="bg-green-600 hover:bg-green-700">Manage Accounts</Button>
              </div>
            </CardContent>
          </Card>
        );
      case "registration":
        return (
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-green-800">Member Registration</CardTitle>
              <CardDescription>Register new cooperative members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Member Registration</h3>
                <p className="text-gray-600 mb-6">Registration system coming soon</p>
                <Button className="bg-green-600 hover:bg-green-700">Start Registration</Button>
              </div>
            </CardContent>
          </Card>
        );
      case "reports":
        return (
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-green-800">Reports</CardTitle>
              <CardDescription>Generate and view system reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Reports & Analytics</h3>
                <p className="text-gray-600 mb-6">Reporting features coming soon</p>
                <Button className="bg-green-600 hover:bg-green-700">Generate Reports</Button>
              </div>
            </CardContent>
          </Card>
        );
      case "notifications":
        return (
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-green-800">Notifications & Messages</CardTitle>
              <CardDescription>Manage system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Notification Center</h3>
                <p className="text-gray-600 mb-6">Notification system coming soon</p>
                <Button className="bg-green-600 hover:bg-green-700">View Notifications</Button>
              </div>
            </CardContent>
          </Card>
        );
      case "messages":
        return (
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-green-800">Messages</CardTitle>
              <CardDescription>Internal messaging system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Message Center</h3>
                <p className="text-gray-600 mb-6">Messaging features coming soon</p>
                <Button className="bg-green-600 hover:bg-green-700">View Messages</Button>
              </div>
            </CardContent>
          </Card>
        );
      case "admin":
        return (
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-green-800">System Admin</CardTitle>
              <CardDescription>System administration and management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">System Administration</h3>
                <p className="text-gray-600 mb-6">Admin features coming soon</p>
                <Button className="bg-green-600 hover:bg-green-700">Admin Panel</Button>
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
    <div 
      className="min-h-screen flex"
      style={{
        backgroundImage: `url('/lovable-uploads/5ed5d582-509e-412c-aa4b-ff19eb8841ba.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            {activeTab === "farmers" && (
              <div className="mb-6">
                <Carousel 
                  className="w-full max-w-4xl mx-auto"
                  plugins={[
                    Autoplay({
                      delay: 3000,
                      stopOnInteraction: false,
                      stopOnMouseEnter: false,
                    }),
                  ]}
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                >
                  <CarouselContent>
                    {milkImages.map((image, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                          <img 
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-48 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </div>
            )}
            <div className="flex items-center gap-3 mb-2">
              {activeTab === "farmers" && <Milk className="w-8 h-8 text-green-600" />}
              {activeTab === "dashboard" && <BarChart3 className="w-8 h-8 text-blue-600" />}
              {activeTab === "loans" && <Users className="w-8 h-8 text-purple-600" />}
              {activeTab === "payments" && <Users className="w-8 h-8 text-orange-600" />}
              {activeTab === "members" && <Users className="w-8 h-8 text-green-600" />}
              {activeTab === "account" && <User className="w-8 h-8 text-blue-600" />}
              {activeTab === "registration" && <UserPlus className="w-8 h-8 text-purple-600" />}
              {activeTab === "reports" && <BarChart3 className="w-8 h-8 text-indigo-600" />}
              {activeTab === "notifications" && <Bell className="w-8 h-8 text-yellow-600" />}
              {activeTab === "messages" && <MessageSquare className="w-8 h-8 text-blue-600" />}
              {activeTab === "admin" && <Users className="w-8 h-8 text-red-600" />}
              {activeTab === "settings" && <Users className="w-8 h-8 text-gray-600" />}
              <h1 className="text-3xl font-bold text-gray-900">
                {activeTab === "dashboard" && "Dashboard Overview"}
                {activeTab === "farmers" && "Milk Analytics"}
                {activeTab === "loans" && "Loan Applications"}
                {activeTab === "payments" && "Payment Management"}
                {activeTab === "members" && "Member Management"}
                {activeTab === "account" && "Account Management"}
                {activeTab === "registration" && "Member Registration"}
                {activeTab === "reports" && "Reports"}
                {activeTab === "notifications" && "Notifications & Messages"}
                {activeTab === "messages" && "Messages"}
                {activeTab === "admin" && "System Admin"}
                {activeTab === "settings" && "System Settings"}
              </h1>
            </div>
            <p className="text-gray-600">
              {activeTab === "dashboard" && "Monitor your cooperative's performance and activities"}
              {activeTab === "farmers" && "Track farmer submissions and milk production analytics"}
              {activeTab === "loans" && "Manage loan applications and approvals"}
              {activeTab === "payments" && "Process and track farmer payments"}
              {activeTab === "members" && "Manage cooperative member information"}
              {activeTab === "account" && "Manage user accounts and profiles"}
              {activeTab === "registration" && "Register new cooperative members"}
              {activeTab === "reports" && "Generate and view system reports"}
              {activeTab === "notifications" && "Manage system notifications and alerts"}
              {activeTab === "messages" && "Internal messaging system"}
              {activeTab === "admin" && "System administration and management"}
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
