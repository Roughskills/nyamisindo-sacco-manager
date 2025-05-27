
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
import { CalendarIcon, Download, FileText, Users, Milk, DollarSign, AlertTriangle, TrendingUp, BarChart3, PieChart, Search, Filter, Printer, CheckCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line } from "recharts";
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

  // Sample data for analytics with dynamic updates based on report generation
  const [analyticsData, setAnalyticsData] = useState({
    milkCollection: [
      { month: 'Jan', volume: 1200 },
      { month: 'Feb', volume: 1400 },
      { month: 'Mar', volume: 1800 },
      { month: 'Apr', volume: 1600 },
      { month: 'May', volume: 2000 },
      { month: 'Jun', volume: 2200 }
    ],
    membership: [
      { category: 'Active', count: 450, color: '#22c55e' },
      { category: 'Inactive', count: 80, color: '#ef4444' },
      { category: 'Pending', count: 25, color: '#f59e0b' }
    ],
    loanRisk: [
      { risk: 'Low Risk', count: 120, color: '#22c55e' },
      { risk: 'Medium Risk', count: 45, color: '#f59e0b' },
      { risk: 'High Risk', count: 15, color: '#ef4444' }
    ],
    systemUsers: [
      { role: 'Admin', count: 5, color: '#8b5cf6' },
      { role: 'Manager', count: 12, color: '#3b82f6' },
      { role: 'Member', count: 450, color: '#22c55e' },
      { role: 'Guest', count: 25, color: '#f59e0b' }
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
    volume: {
      label: "Volume (Liters)",
      color: "#22c55e",
    },
    count: {
      label: "Count",
      color: "#3b82f6",
    },
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

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Milk Collection Trends
                </CardTitle>
                <CardDescription>Monthly milk collection data with live updates</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData.milkCollection}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="volume" fill="var(--color-volume)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Membership Distribution
                </CardTitle>
                <CardDescription>Current membership status breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <RechartsPieChart data={analyticsData.membership} cx="50%" cy="50%" outerRadius={80}>
                        {analyticsData.membership.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </RechartsPieChart>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Loan Risk Assessment
                </CardTitle>
                <CardDescription>Current loan portfolio risk distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData.loanRisk} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="risk" type="category" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="var(--color-count)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  System Users by Role
                </CardTitle>
                <CardDescription>User distribution across different roles</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <RechartsPieChart data={analyticsData.systemUsers} cx="50%" cy="50%" outerRadius={80}>
                        {analyticsData.systemUsers.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </RechartsPieChart>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Real-time Statistics</CardTitle>
              <CardDescription>Live updates from the latest report generation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Active Members</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">
                    {analyticsData.membership.find(m => m.category === 'Active')?.count || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Milk className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Latest Collection</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">
                    {analyticsData.milkCollection[analyticsData.milkCollection.length - 1]?.volume || 0}L
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium">High Risk Loans</span>
                  </div>
                  <span className="text-lg font-bold text-yellow-600">
                    {analyticsData.loanRisk.find(l => l.risk === 'High Risk')?.count || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium">Total Savings</span>
                  </div>
                  <span className="text-lg font-bold text-purple-600">UGX 45M</span>
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
