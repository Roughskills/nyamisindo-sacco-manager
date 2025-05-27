import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "./Logo";
import { 
  LayoutDashboard, 
  BarChart3, 
  FileText, 
  CreditCard, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  User,
  UserPlus,
  Bell
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "farmers", label: "Milk Analytics", icon: BarChart3 },
    { id: "loans", label: "Loan Applications", icon: FileText },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "members", label: "Members", icon: Users },
    { id: "account", label: "Account Management", icon: User },
    { id: "registration", label: "Member Enrollment", icon: UserPlus },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "notifications", label: "Notifications & Messages", icon: Bell },
    { id: "admin", label: "System Admin", icon: Settings },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className={`bg-white shadow-lg border-r border-gray-200 flex flex-col transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <Logo size="sm" showText={true} />
          )}
          {isCollapsed && (
            <div className="flex justify-center w-full">
              <Logo size="sm" showText={false} />
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-green-100 text-green-800 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <Avatar>
            <AvatarFallback className="bg-green-100 text-green-800">
              {user?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-600 truncate">{user?.role}</p>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="w-full mt-3 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
