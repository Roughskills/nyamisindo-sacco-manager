import DashboardContent from "./DashboardContent";
import FarmerList from "./FarmerList";
import LoanTracker from "./LoanTracker";
import MilkDistributionChart from "./MilkDistributionChart";
import Chart3D from "./Chart3D";
import PlaceholderCard from "./PlaceholderCard";
import MembersPage from "./MembersPage";
import AccountManagementPage from "./AccountManagementPage";
import PaymentManagement from "./PaymentManagement";

interface MainContentProps {
  activeTab: string;
}

const MainContent = ({ activeTab }: MainContentProps) => {
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
      return <PaymentManagement />;
    
    case "members":
      return <MembersPage />;
    
    case "account":
      return <AccountManagementPage />;
    
    case "registration":
      return (
        <PlaceholderCard
          title="Member Registration"
          description="Register new cooperative members"
          featureName="Member Registration"
          buttonText="Start Registration"
        />
      );
    
    case "reports":
      return (
        <PlaceholderCard
          title="Reports"
          description="Generate and view system reports"
          featureName="Reports & Analytics"
          buttonText="Generate Reports"
        />
      );
    
    case "notifications":
      return (
        <PlaceholderCard
          title="Notifications & Messages"
          description="Manage system notifications and alerts"
          featureName="Notification Center"
          buttonText="View Notifications"
        />
      );
    
    case "messages":
      return (
        <PlaceholderCard
          title="Messages"
          description="Internal messaging system"
          featureName="Message Center"
          buttonText="View Messages"
        />
      );
    
    case "admin":
      return (
        <PlaceholderCard
          title="System Admin"
          description="System administration and management"
          featureName="System Administration"
          buttonText="Admin Panel"
        />
      );
    
    case "settings":
      return (
        <PlaceholderCard
          title="Settings"
          description="System configuration and preferences"
          featureName="System Settings"
          buttonText="Configure Settings"
        />
      );
    
    default:
      return <DashboardContent />;
  }
};

export default MainContent;
