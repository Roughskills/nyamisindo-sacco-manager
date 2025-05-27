
import DashboardContent from "./DashboardContent";
import FarmerList from "./FarmerList";
import LoanTracker from "./LoanTracker";
import MilkDistributionChart from "./MilkDistributionChart";
import Chart3D from "./Chart3D";
import PlaceholderCard from "./PlaceholderCard";
import MembersPage from "./MembersPage";
import AccountManagementPage from "./AccountManagementPage";
import PaymentManagement from "./PaymentManagement";
import NotificationsPage from "./NotificationsPage";
import ReportsPage from "./ReportsPage";
import SystemAdminPage from "./SystemAdminPage";
import SettingsPage from "./SettingsPage";

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
      return <ReportsPage />;
    
    case "notifications":
      return <NotificationsPage />;
    
    case "admin":
      return <SystemAdminPage />;
    
    case "settings":
      return <SettingsPage />;
    
    default:
      return <DashboardContent />;
  }
};

export default MainContent;
