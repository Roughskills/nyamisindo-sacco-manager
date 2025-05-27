
import { BarChart3, Users, Milk, User, UserPlus, Bell, MessageSquare, Droplets } from "lucide-react";

interface MainHeaderProps {
  activeTab: string;
}

const MainHeader = ({ activeTab }: MainHeaderProps) => {
  const getIcon = () => {
    switch (activeTab) {
      case "farmers":
        return <Milk className="w-8 h-8 text-green-600" />;
      case "collection":
        return <Droplets className="w-8 h-8 text-blue-600" />;
      case "dashboard":
        return <BarChart3 className="w-8 h-8 text-blue-600" />;
      case "loans":
        return <Users className="w-8 h-8 text-purple-600" />;
      case "payments":
        return <Users className="w-8 h-8 text-orange-600" />;
      case "members":
        return <Users className="w-8 h-8 text-green-600" />;
      case "account":
        return <User className="w-8 h-8 text-blue-600" />;
      case "registration":
        return <UserPlus className="w-8 h-8 text-purple-600" />;
      case "reports":
        return <BarChart3 className="w-8 h-8 text-indigo-600" />;
      case "notifications":
        return <Bell className="w-8 h-8 text-yellow-600" />;
      case "messages":
        return <MessageSquare className="w-8 h-8 text-blue-600" />;
      case "admin":
        return <Users className="w-8 h-8 text-red-600" />;
      case "settings":
        return <Users className="w-8 h-8 text-gray-600" />;
      default:
        return <BarChart3 className="w-8 h-8 text-blue-600" />;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "Dashboard Overview";
      case "farmers":
        return "Individual Production Analysis";
      case "collection":
        return "Milk Collection";
      case "loans":
        return "Loan Applications";
      case "payments":
        return "Payment Management";
      case "members":
        return "Member Management";
      case "account":
        return "Account Management";
      case "registration":
        return "Member Registration";
      case "reports":
        return "Reports";
      case "notifications":
        return "Notifications & Messages";
      case "messages":
        return "Messages";
      case "admin":
        return "System Admin";
      case "settings":
        return "System Settings";
      default:
        return "Dashboard Overview";
    }
  };

  const getDescription = () => {
    switch (activeTab) {
      case "dashboard":
        return "Monitor your cooperative's performance and activities";
      case "farmers":
        return "Track farmer submissions and milk production analytics";
      case "collection":
        return "Record and manage milk collections from farmers";
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
    <div className="flex items-center gap-3 mb-2">
      {getIcon()}
      <h1 className="text-3xl font-bold text-gray-900">{getTitle()}</h1>
    </div>
  );
};

export default MainHeader;
