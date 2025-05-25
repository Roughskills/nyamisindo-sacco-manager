
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const MilkProductionChart = () => {
  const data = [
    { day: "Mon", production: 2400 },
    { day: "Tue", production: 2600 },
    { day: "Wed", production: 2800 },
    { day: "Thu", production: 2550 },
    { day: "Fri", production: 2750 },
    { day: "Sat", production: 2900 },
    { day: "Sun", population: 2847 },
  ];

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-green-800">Weekly Milk Production</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip 
              labelStyle={{ color: '#374151' }}
              contentStyle={{ 
                backgroundColor: '#f9fafb', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px' 
              }}
            />
            <Line 
              type="monotone" 
              dataKey="production" 
              stroke="#059669" 
              strokeWidth={3}
              dot={{ fill: '#059669', strokeWidth: 2, r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MilkProductionChart;
