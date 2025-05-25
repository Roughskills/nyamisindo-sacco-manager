
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MilkProductionChart from "./MilkProductionChart";

const DashboardContent = () => {
  const stats = [
    {
      title: "Total Members",
      value: "243",
      change: "+12 new",
      changeType: "positive",
      icon: "👥"
    },
    {
      title: "Milk Collected Today",
      value: "5,420L",
      change: "+5.2%",
      changeType: "positive",
      icon: "🥛"
    },
    {
      title: "Total Revenue",
      value: "RWF 1,284,000",
      change: "+8.1%",
      changeType: "positive",
      icon: "💰"
    },
    {
      title: "Active Loans",
      value: "47",
      change: "-3 this week",
      changeType: "neutral",
      icon: "📋"
    }
  ];

  const recentSubmissions = [
    { id: 1, farmer: "John Muhire", amount: "25L", time: "06:30 AM", payment: "5,000 RWF" },
    { id: 2, farmer: "Mary Uwimana", amount: "18L", time: "07:15 AM", payment: "3,600 RWF" },
    { id: 3, farmer: "Peter Nkusi", amount: "32L", time: "07:45 AM", payment: "6,400 RWF" },
    { id: 4, farmer: "Alice Mukamana", amount: "22L", time: "08:00 AM", payment: "4,400 RWF" },
    { id: 5, farmer: "David Nzeyimana", amount: "28L", time: "08:15 AM", payment: "5,600 RWF" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-md border-0 bg-white hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className="text-2xl">{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <p className={`text-xs ${
                stat.changeType === 'positive' ? 'text-green-600' : 
                stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MilkProductionChart />
        
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-green-800">Recent Milk Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSubmissions.map((submission) => (
                <div key={submission.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{submission.farmer}</p>
                    <p className="text-sm text-gray-600">{submission.amount} • {submission.time}</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {submission.payment}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;
