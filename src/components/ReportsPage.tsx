import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, FileText, Users, Milk, DollarSign, AlertTriangle, TrendingUp, BarChart3, PieChart, Search, Filter, Printer, CheckCircle, Loader2, Activity, Target } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line, AreaChart, Area, RadialBarChart, RadialBar, Legend } from "recharts";
import { useToast } from "@/hooks/use-toast";

interface Report {
  id: string;
  name: string;
  description: string;
  category: string;
  lastGenerated: Date;
  status: 'ready' | 'generating' | 'error';
  icon: any;
  hasAnalytics: boolean;
}

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState<string>('');
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [generatingReports, setGeneratingReports] = useState<Set<string>>(new Set());
  const [downloadingReports, setDownloadingReports] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const reports: Report[] = [
    {
      id: 'system-users',
      name: 'System Users Report',
      description: 'Complete list of all system users with roles and access levels',
      category: 'users',
      lastGenerated: new Date('2024-01-15'),
      status: 'ready',
      icon: Users,
      hasAnalytics: true
    },
    {
      id: 'membership',
      name: 'Membership Report',
      description: 'Detailed membership information and statistics',
      category: 'members',
      lastGenerated: new Date('2024-01-14'),
      status: 'ready',
      icon: Users,
      hasAnalytics: true
    },
    {
      id: 'daily-milk',
      name: 'Daily Milk Collection',
      description: 'Daily milk collection volumes and trends',
      category: 'production',
      lastGenerated: new Date('2024-01-15'),
      status: 'ready',
      icon: Milk,
      hasAnalytics: true
    },
    {
      id: 'savings',
      name: 'Savings Report',
      description: 'Member savings accounts and transaction history',
      category: 'financial',
      lastGenerated: new Date('2024-01-13'),
      status: 'ready',
      icon: DollarSign,
      hasAnalytics: true
    },
    {
      id: 'loans-overdue',
      name: 'Loans Overdue Report',
      description: 'List of overdue loans and payment status',
      category: 'loans',
      lastGenerated: new Date('2024-01-12'),
      status: 'ready',
      icon: AlertTriangle,
      hasAnalytics: true
    },
    {
      id: 'loan-risk',
      name: 'Loan Risk Classification',
      description: 'Risk assessment and classification of all loans',
      category: 'loans',
      lastGenerated: new Date('2024-01-11'),
      status: 'ready',
      icon: TrendingUp,
      hasAnalytics: true
    },
    {
      id: 'financial-summary',
      name: 'Financial Summary',
      description: 'Comprehensive financial overview and statements',
      category: 'financial',
      lastGenerated: new Date('2024-01-10'),
      status: 'ready',
      icon: BarChart3,
      hasAnalytics: true
    }
  ];

  // Enhanced analytics data with more visual variety
  const [analyticsData, setAnalyticsData] = useState({
    milkCollection: [
      { month: 'Jan', volume: 1200, target: 1000, efficiency: 85 },
      { month: 'Feb', volume: 1400, target: 1200, efficiency: 92 },
      { month: 'Mar', volume: 1800, target: 1500, efficiency: 95 },
      { month: 'Apr', volume: 1600, target: 1400, efficiency: 88 },
      { month: 'May', volume: 2000, target: 1800, efficiency: 96 },
      { month: 'Jun', volume: 2200, target: 2000, efficiency: 98 }
    ],
    dailyTrends: [
      { day: 'Mon', morning: 450, afternoon: 320, evening: 180 },
      { day: 'Tue', morning: 480, afternoon: 340, evening: 200 },
      { day: 'Wed', morning: 520, afternoon: 380, evening: 220 },
      { day: 'Thu', morning: 490, afternoon: 360, evening: 190 },
      { day: 'Fri', morning: 510, afternoon: 390, evening: 210 },
      { day: 'Sat', morning: 580, afternoon: 420, evening: 250 },
      { day: 'Sun', morning: 620, afternoon: 450, evening: 280 }
    ],
    membership: [
      { category: 'Active Members', count: 450, percentage: 81, color: '#00ff88' },
      { category: 'Inactive Members', count: 80, percentage: 14, color: '#ff4757' },
      { category: 'Pending Applications', count: 25, percentage: 5, color: '#ffa502' }
    ],
    loanRisk: [
      { risk: 'Low Risk', count: 120, percentage: 67, color: '#00ff88', fill: 85 },
      { risk: 'Medium Risk', count: 45, percentage: 25, color: '#ffa502', fill: 60 },
      { risk: 'High Risk', count: 15, percentage: 8, color: '#ff4757', fill: 35 }
    ],
    financialMetrics: [
      { name: 'Savings', value: 190.34, target: 200, color: '#00ff88', percentage: 95 },
      { name: 'Loans', value: 145.67, target: 180, color: '#3742fa', percentage: 81 },
      { name: 'Revenue', value: 298.45, target: 300, color: '#ffa502', percentage: 99 },
      { name: 'Expenses', value: 156.78, target: 150, color: '#ff4757', percentage: 105 }
    ]
  });

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const generateReport = async (reportId: string) => {
    console.log(`Starting report generation for: ${reportId}`);
    setGeneratingReports(prev => new Set(prev).add(reportId));
    
    try {
      // Simulate report generation with realistic delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate updating analytics data based on the report
      if (reportId === 'daily-milk') {
        setAnalyticsData(prev => ({
          ...prev,
          milkCollection: prev.milkCollection.map(item => ({
            ...item,
            volume: item.volume + Math.floor(Math.random() * 100)
          }))
        }));
      }
      
      toast({
        title: "Report Generated Successfully",
        description: `${reports.find(r => r.id === reportId)?.name} has been generated and is ready for download.`,
      });
      
      console.log(`Report generation completed for: ${reportId}`);
    } catch (error) {
      console.error(`Report generation failed for: ${reportId}`, error);
      toast({
        title: "Report Generation Failed",
        description: "There was an error generating the report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGeneratingReports(prev => {
        const newSet = new Set(prev);
        newSet.delete(reportId);
        return newSet;
      });
    }
  };

  const exportReport = async (reportId: string, format: string) => {
    const reportName = reports.find(r => r.id === reportId)?.name || 'Report';
    const downloadKey = `${reportId}-${format}`;
    
    console.log(`Starting export of ${reportName} in ${format.toUpperCase()} format`);
    setDownloadingReports(prev => new Set(prev).add(downloadKey));
    
    try {
      // Simulate file generation and download
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create mock file content based on format
      let content = '';
      let mimeType = '';
      let fileExtension = '';
      
      switch (format) {
        case 'pdf':
          content = `%PDF-1.4\n${reportName} - Generated on ${new Date().toISOString()}`;
          mimeType = 'application/pdf';
          fileExtension = 'pdf';
          break;
        case 'excel':
          content = `${reportName}\nGenerated on: ${new Date().toISOString()}\n\nSample Data:\nColumn 1,Column 2,Column 3\nValue 1,Value 2,Value 3`;
          mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          fileExtension = 'xlsx';
          break;
        case 'word':
          content = `${reportName}\n\nGenerated on: ${new Date().toISOString()}\n\nThis is a sample report document.`;
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          fileExtension = 'docx';
          break;
        case 'csv':
          content = `Report Name,Generated Date\n"${reportName}","${new Date().toISOString()}"`;
          mimeType = 'text/csv';
          fileExtension = 'csv';
          break;
        default:
          throw new Error('Unsupported format');
      }
      
      // Create and trigger download
      const blob = new Blob([content], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${reportName.replace(/\s+/g, '_')}.${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Download Started",
        description: `${reportName} is being downloaded in ${format.toUpperCase()} format.`,
      });
      
      console.log(`Export completed for ${reportName} in ${format} format`);
    } catch (error) {
      console.error(`Export failed for ${reportName} in ${format} format:`, error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting the report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDownloadingReports(prev => {
        const newSet = new Set(prev);
        newSet.delete(downloadKey);
        return newSet;
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return <Badge className="bg-green-100 text-green-800">Ready</Badge>;
      case 'generating':
        return <Badge className="bg-yellow-100 text-yellow-800">Generating</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const chartConfig = {
    volume: { label: "Volume (Liters)", color: "#00ff88" },
    target: { label: "Target", color: "#3742fa" },
    efficiency: { label: "Efficiency %", color: "#ffa502" },
    morning: { label: "Morning", color: "#00ff88" },
    afternoon: { label: "Afternoon", color: "#3742fa" },
    evening: { label: "Evening", color: "#ff4757" },
    count: { label: "Count", color: "#00ff88" }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="available" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available">Available Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Insights</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Report Library
                  </CardTitle>
                  <CardDescription>
                    Generate and download comprehensive reports
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search reports..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="users">Users</SelectItem>
                      <SelectItem value="members">Members</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="loans">Loans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredReports.map((report) => {
                  const Icon = report.icon;
                  const isGenerating = generatingReports.has(report.id);
                  return (
                    <Card key={report.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="h-5 w-5 text-blue-600" />
                            <span className="font-medium text-sm">{report.name}</span>
                          </div>
                          {isGenerating ? (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                              Generating
                            </Badge>
                          ) : (
                            getStatusBadge(report.status)
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-xs text-gray-600 mb-3">{report.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <span>Last generated: {format(report.lastGenerated, 'MMM dd, yyyy')}</span>
                          {report.hasAnalytics && (
                            <Badge variant="outline" className="text-xs">
                              <BarChart3 className="h-3 w-3 mr-1" />
                              Analytics
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => generateReport(report.id)}
                            disabled={isGenerating}
                          >
                            {isGenerating ? (
                              <>
                                <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                                Generating...
                              </>
                            ) : (
                              'Generate'
                            )}
                          </Button>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button size="sm" variant="outline" disabled={isGenerating}>
                                <Download className="h-3 w-3" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-48" align="end">
                              <div className="space-y-2">
                                <p className="text-sm font-medium">Export Format</p>
                                {['pdf', 'excel', 'word', 'csv'].map((format) => {
                                  const downloadKey = `${report.id}-${format}`;
                                  const isDownloading = downloadingReports.has(downloadKey);
                                  return (
                                    <Button
                                      key={format}
                                      variant="ghost"
                                      size="sm"
                                      className="w-full justify-start"
                                      onClick={() => exportReport(report.id, format)}
                                      disabled={isDownloading}
                                    >
                                      {isDownloading ? (
                                        <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                                      ) : (
                                        <FileText className="h-3 w-3 mr-2" />
                                      )}
                                      {format.toUpperCase()}
                                    </Button>
                                  );
                                })}
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Key Metrics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {analyticsData.financialMetrics.map((metric, index) => (
              <Card key={metric.name} className="bg-slate-900 border-slate-700 text-white relative overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">{metric.name}</span>
                    <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: metric.color }} />
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold" style={{ color: metric.color }}>
                      {metric.value}
                      <span className="text-xs ml-1 text-slate-400">UGX M</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Target: {metric.target}M</span>
                      <span className={metric.percentage >= 100 ? "text-green-400" : "text-yellow-400"}>
                        {metric.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1">
                      <div 
                        className="h-1 rounded-full transition-all duration-500" 
                        style={{ 
                          width: `${Math.min(metric.percentage, 100)}%`,
                          backgroundColor: metric.color 
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enhanced Milk Collection Chart */}
            <Card className="bg-slate-900 border-slate-700 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <BarChart3 className="h-5 w-5 text-cyan-400" />
                  Milk Collection Performance
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Monthly collection vs targets with efficiency tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData.milkCollection}>
                      <defs>
                        <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00ff88" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#00ff88" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3742fa" stopOpacity={0.6}/>
                          <stop offset="95%" stopColor="#3742fa" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <ChartTooltip 
                        content={<ChartTooltipContent className="bg-slate-800 border-slate-600" />}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="target" 
                        stroke="#3742fa" 
                        fillOpacity={1} 
                        fill="url(#targetGradient)" 
                        strokeWidth={2}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="volume" 
                        stroke="#00ff88" 
                        fillOpacity={1} 
                        fill="url(#volumeGradient)" 
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Circular Progress Membership */}
            <Card className="bg-slate-900 border-slate-700 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Users className="h-5 w-5 text-purple-400" />
                  Membership Distribution
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Active membership status breakdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-[300px] flex items-center justify-center">
                  <div className="relative">
                    {analyticsData.membership.map((item, index) => (
                      <div key={item.category} className="absolute inset-0 flex items-center justify-center">
                        <div 
                          className="rounded-full border-4 transition-all duration-1000"
                          style={{
                            width: `${200 - index * 50}px`,
                            height: `${200 - index * 50}px`,
                            borderColor: item.color,
                            borderTopColor: 'transparent',
                            transform: `rotate(${(item.percentage / 100) * 360}deg)`,
                            opacity: 0.8
                          }}
                        />
                      </div>
                    ))}
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-3xl font-bold text-white">555</span>
                      <span className="text-sm text-slate-400">Total Members</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 space-y-2">
                    {analyticsData.membership.map((item) => (
                      <div key={item.category} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs text-slate-300">{item.category}</span>
                        <span className="text-xs font-bold" style={{ color: item.color }}>
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Collection Trends */}
            <Card className="bg-slate-900 border-slate-700 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Activity className="h-5 w-5 text-green-400" />
                  Daily Collection Patterns
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Morning, afternoon, and evening collection trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData.dailyTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="day" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <ChartTooltip 
                        content={<ChartTooltipContent className="bg-slate-800 border-slate-600" />}
                      />
                      <Bar dataKey="morning" stackId="a" fill="#00ff88" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="afternoon" stackId="a" fill="#3742fa" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="evening" stackId="a" fill="#ff4757" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Loan Risk Radial Chart */}
            <Card className="bg-slate-900 border-slate-700 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Target className="h-5 w-5 text-yellow-400" />
                  Loan Risk Assessment
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Risk distribution with performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <div className="grid grid-cols-1 gap-6 w-full">
                    {analyticsData.loanRisk.map((risk, index) => (
                      <div key={risk.risk} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: risk.color }}
                          />
                          <span className="text-sm text-slate-300">{risk.risk}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 w-24 bg-slate-800 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full transition-all duration-1000"
                              style={{ 
                                width: `${risk.fill}%`,
                                backgroundColor: risk.color 
                              }}
                            />
                          </div>
                          <span className="text-sm font-bold" style={{ color: risk.color }}>
                            {risk.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Statistics with modern design */}
          <Card className="bg-slate-900 border-slate-700 text-white">
            <CardHeader>
              <CardTitle className="text-white">Real-time Performance Dashboard</CardTitle>
              <CardDescription className="text-slate-400">
                Live updates from the latest report generation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 p-4 rounded-lg border border-green-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-green-400" />
                      <span className="text-sm font-medium text-green-300">Active Members</span>
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-green-400">450</span>
                    <span className="text-xs text-green-300 ml-2">+12 this month</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 p-4 rounded-lg border border-blue-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Milk className="h-5 w-5 text-blue-400" />
                      <span className="text-sm font-medium text-blue-300">Daily Collection</span>
                    </div>
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-blue-400">2,200L</span>
                    <span className="text-xs text-blue-300 ml-2">+8% vs yesterday</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 p-4 rounded-lg border border-yellow-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      <span className="text-sm font-medium text-yellow-300">High Risk Loans</span>
                    </div>
                    <TrendingUp className="h-4 w-4 text-yellow-400 rotate-180" />
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-yellow-400">15</span>
                    <span className="text-xs text-yellow-300 ml-2">-3 this month</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 p-4 rounded-lg border border-purple-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-purple-400" />
                      <span className="text-sm font-medium text-purple-300">Total Savings</span>
                    </div>
                    <TrendingUp className="h-4 w-4 text-purple-400" />
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-purple-400">190.34M</span>
                    <span className="text-xs text-purple-300 ml-2">UGX</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Scheduled Reports
              </CardTitle>
              <CardDescription>
                Manage automated report generation schedules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Daily Milk Collection</TableCell>
                    <TableCell>Daily at 6:00 AM</TableCell>
                    <TableCell>Tomorrow 6:00 AM</TableCell>
                    <TableCell>admin@coop.com</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Weekly Financial Summary</TableCell>
                    <TableCell>Weekly on Monday</TableCell>
                    <TableCell>Next Monday 8:00 AM</TableCell>
                    <TableCell>finance@coop.com</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Monthly Membership Report</TableCell>
                    <TableCell>Monthly on 1st</TableCell>
                    <TableCell>Feb 1, 2024 9:00 AM</TableCell>
                    <TableCell>hr@coop.com</TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-100 text-yellow-800">Paused</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
