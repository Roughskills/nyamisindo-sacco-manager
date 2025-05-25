
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { PieChart as PieChartIcon, BarChart3 } from 'lucide-react';

const MilkDistributionChart = () => {
  const [chartType, setChartType] = useState<'pie' | 'bar'>('pie');

  const distributionData = [
    { name: 'John Muhire', milk: 720, fill: '#0088FE' },
    { name: 'Mary Uwimana', milk: 650, fill: '#00C49F' },
    { name: 'Peter Nkusi', milk: 580, fill: '#FFBB28' },
    { name: 'Grace Mukamana', milk: 695, fill: '#FF8042' },
    { name: 'David Kayitare', milk: 445, fill: '#8884D8' },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="shadow-lg border-0 mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-green-800 flex items-center gap-2">
            <PieChartIcon className="w-6 h-6" />
            Monthly Milk Distribution (Liters)
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={chartType === 'pie' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('pie')}
              className="flex items-center gap-1"
            >
              <PieChartIcon className="w-4 h-4" />
              3D Pie
            </Button>
            <Button
              variant={chartType === 'bar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('bar')}
              className="flex items-center gap-1"
            >
              <BarChart3 className="w-4 h-4" />
              3D Bar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'pie' ? (
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="milk"
                  stroke="#fff"
                  strokeWidth={2}
                  style={{
                    filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.3))',
                  }}
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [`${value}L`, 'Monthly Production']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => <span style={{ color: '#374151' }}>{value}</span>}
                />
              </PieChart>
            ) : (
              <BarChart data={distributionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                  stroke="#6b7280"
                />
                <YAxis 
                  label={{ value: 'Milk (Liters)', angle: -90, position: 'insideLeft' }}
                  fontSize={12}
                  stroke="#6b7280"
                />
                <Tooltip 
                  formatter={(value: any) => [`${value}L`, 'Monthly Production']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="milk" 
                  fill="#10b981"
                  stroke="#065f46"
                  strokeWidth={1}
                  style={{
                    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))',
                  }}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {distributionData.map((farmer, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <div 
                className="w-4 h-4 rounded-full mx-auto mb-2"
                style={{ backgroundColor: farmer.fill }}
              ></div>
              <p className="text-sm font-medium text-gray-900">{farmer.name.split(' ')[0]}</p>
              <p className="text-xs text-gray-600">{farmer.milk}L</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MilkDistributionChart;
