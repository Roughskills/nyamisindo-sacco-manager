
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardStats = () => {
  const stats = [
    {
      title: "Total Farmers",
      value: "156",
      change: "+12",
      changeType: "positive",
      icon: "👥"
    },
    {
      title: "Today's Milk (L)",
      value: "2,847",
      change: "+5.2%",
      changeType: "positive",
      icon: "🥛"
    },
    {
      title: "Total Revenue (RWF)",
      value: "569,400",
      change: "+8.1%",
      changeType: "positive",
      icon: "💰"
    },
    {
      title: "Active Loans",
      value: "23",
      change: "-2",
      changeType: "neutral",
      icon: "📋"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300">
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
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
