
import { useState } from "react";
import Sidebar from "./Sidebar";
import MainHeader from "./MainHeader";
import ImageCarousel from "./ImageCarousel";
import MainContent from "./MainContent";

const MainLayout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const getDescription = () => {
    switch (activeTab) {
      case "dashboard":
        return "Monitor your cooperative's performance and activities";
      case "farmers":
        return "Track farmer submissions and milk production analytics";
      case "loans":
        return "Manage loan applications and approvals";
      case "payments":
        return "Process and track farmer payments";
      case "members":
        return "Manage cooperative member information";
      case "account":
        return "Manage user accounts and profiles";
      case "registration":
        return "Register new cooperative members";
      case "reports":
        return "Generate and view system reports";
      case "notifications":
        return "Manage system notifications and alerts";
      case "messages":
        return "Internal messaging system";
      case "admin":
        return "System administration and management";
      case "settings":
        return "Configure system settings and preferences";
      default:
        return "Monitor your cooperative's performance and activities";
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
            {activeTab === "farmers" && <ImageCarousel />}
            <MainHeader activeTab={activeTab} />
            <p className="text-gray-600">{getDescription()}</p>
          </div>
          <MainContent activeTab={activeTab} />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
