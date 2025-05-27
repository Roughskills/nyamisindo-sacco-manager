
import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Search, Filter, Download, Eye, Users, Milk, DollarSign, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ReportViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportId: string;
  reportName: string;
}

const ReportViewModal = ({ isOpen, onClose, reportId, reportName }: ReportViewModalProps) => {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data for different report types
  const mockData = useMemo(() => {
    const userData = [
      { id: 1, name: "John Doe", email: "john@coop.com", role: "Admin", status: "Active", joinDate: "2024-01-15", lastLogin: "2024-01-20" },
      { id: 2, name: "Jane Smith", email: "jane@coop.com", role: "Manager", status: "Active", joinDate: "2024-01-10", lastLogin: "2024-01-19" },
      { id: 3, name: "Bob Wilson", email: "bob@coop.com", role: "Member", status: "Inactive", joinDate: "2024-01-05", lastLogin: "2024-01-15" },
      { id: 4, name: "Alice Brown", email: "alice@coop.com", role: "Member", status: "Active", joinDate: "2024-01-20", lastLogin: "2024-01-21" },
      { id: 5, name: "Tom Johnson", email: "tom@coop.com", role: "Member", status: "Pending", joinDate: "2024-01-18", lastLogin: "Never" },
    ];

    const milkData = [
      { id: 1, farmerName: "James Okello", date: "2024-01-20", morning: 45, afternoon: 32, evening: 18, total: 95, quality: "Grade A" },
      { id: 2, farmerName: "Mary Akinyi", date: "2024-01-20", morning: 38, afternoon: 28, evening: 15, total: 81, quality: "Grade A" },
      { id: 3, farmerName: "Peter Wanjiku", date: "2024-01-20", morning: 52, afternoon: 35, evening: 22, total: 109, quality: "Grade B" },
      { id: 4, farmerName: "Grace Muthoni", date: "2024-01-20", morning: 41, afternoon: 30, evening: 17, total: 88, quality: "Grade A" },
      { id: 5, farmerName: "David Kiprotich", date: "2024-01-20", morning: 47, afternoon: 33, evening: 19, total: 99, quality: "Grade A" },
    ];

    const loanData = [
      { id: 1, memberName: "Samuel Ochieng", amount: 50000, dueDate: "2024-02-15", daysOverdue: 5, status: "Overdue", risk: "Medium" },
      { id: 2, memberName: "Rebecca Nyong", amount: 75000, dueDate: "2024-02-20", daysOverdue: 0, status: "Current", risk: "Low" },
      { id: 3, memberName: "Michael Kamau", amount: 120000, dueDate: "2024-01-30", daysOverdue: 15, status: "Overdue", risk: "High" },
      { id: 4, memberName: "Sarah Wanjala", amount: 30000, dueDate: "2024-03-01", daysOverdue: 0, status: "Current", risk: "Low" },
      { id: 5, memberName: "Joseph Mbugua", amount: 85000, dueDate: "2024-02-10", daysOverdue: 10, status: "Overdue", risk: "High" },
    ];

    const savingsData = [
      { id: 1, memberName: "Catherine Njeri", accountNo: "SAV001", balance: 125000, lastDeposit: "2024-01-18", status: "Active" },
      { id: 2, memberName: "Francis Mutua", accountNo: "SAV002", balance: 85000, lastDeposit: "2024-01-20", status: "Active" },
      { id: 3, memberName: "Margaret Achieng", accountNo: "SAV003", balance: 200000, lastDeposit: "2024-01-15", status: "Active" },
      { id: 4, memberName: "John Mwangi", accountNo: "SAV004", balance: 65000, lastDeposit: "2024-01-10", status: "Dormant" },
      { id: 5, memberName: "Rose Chebet", accountNo: "SAV005", balance: 145000, lastDeposit: "2024-01-19", status: "Active" },
    ];

    switch (reportId) {
      case 'system-users':
      case 'membership':
        return userData;
      case 'daily-milk':
        return milkData;
      case 'loans-overdue':
      case 'loan-risk':
        return loanData;
      case 'savings':
        return savingsData;
      default:
        return userData;
    }
  }, [reportId]);

  // Filter data based on search term and status
  const filteredData = useMemo(() => {
    return mockData.filter(item => {
      const matchesSearch = Object.values(item).some(value => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      let matchesStatus = true;
      if (statusFilter !== 'all') {
        if ('status' in item) {
          matchesStatus = item.status.toLowerCase() === statusFilter.toLowerCase();
        } else if ('quality' in item) {
          matchesStatus = item.quality.toLowerCase().includes(statusFilter.toLowerCase());
        } else if ('risk' in item) {
          matchesStatus = item.risk.toLowerCase() === statusFilter.toLowerCase();
        }
      }
      
      return matchesSearch && matchesStatus;
    });
  }, [mockData, searchTerm, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-red-100 text-red-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Current': 'bg-blue-100 text-blue-800',
      'Overdue': 'bg-red-100 text-red-800',
      'Dormant': 'bg-gray-100 text-gray-800',
      'Grade A': 'bg-green-100 text-green-800',
      'Grade B': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'High': 'bg-red-100 text-red-800'
    };
    return <Badge className={colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>{status}</Badge>;
  };

  const getReportColumns = () => {
    switch (reportId) {
      case 'system-users':
      case 'membership':
        return ['Name', 'Email', 'Role', 'Status', 'Join Date', 'Last Login'];
      case 'daily-milk':
        return ['Farmer', 'Date', 'Morning (L)', 'Afternoon (L)', 'Evening (L)', 'Total (L)', 'Quality'];
      case 'loans-overdue':
      case 'loan-risk':
        return ['Member', 'Amount (UGX)', 'Due Date', 'Days Overdue', 'Status', 'Risk Level'];
      case 'savings':
        return ['Member', 'Account No', 'Balance (UGX)', 'Last Deposit', 'Status'];
      default:
        return ['Name', 'Email', 'Role', 'Status'];
    }
  };

  const renderTableRow = (item: any, index: number) => {
    switch (reportId) {
      case 'system-users':
      case 'membership':
        return (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.role}</TableCell>
            <TableCell>{getStatusBadge(item.status)}</TableCell>
            <TableCell>{item.joinDate}</TableCell>
            <TableCell>{item.lastLogin}</TableCell>
          </TableRow>
        );
      case 'daily-milk':
        return (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.farmerName}</TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>{item.morning}</TableCell>
            <TableCell>{item.afternoon}</TableCell>
            <TableCell>{item.evening}</TableCell>
            <TableCell className="font-medium">{item.total}</TableCell>
            <TableCell>{getStatusBadge(item.quality)}</TableCell>
          </TableRow>
        );
      case 'loans-overdue':
      case 'loan-risk':
        return (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.memberName}</TableCell>
            <TableCell>{item.amount.toLocaleString()}</TableCell>
            <TableCell>{item.dueDate}</TableCell>
            <TableCell>{item.daysOverdue}</TableCell>
            <TableCell>{getStatusBadge(item.status)}</TableCell>
            <TableCell>{getStatusBadge(item.risk)}</TableCell>
          </TableRow>
        );
      case 'savings':
        return (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.memberName}</TableCell>
            <TableCell>{item.accountNo}</TableCell>
            <TableCell>{item.balance.toLocaleString()}</TableCell>
            <TableCell>{item.lastDeposit}</TableCell>
            <TableCell>{getStatusBadge(item.status)}</TableCell>
          </TableRow>
        );
      default:
        return (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.role}</TableCell>
            <TableCell>{getStatusBadge(item.status)}</TableCell>
          </TableRow>
        );
    }
  };

  const getFilterOptions = () => {
    switch (reportId) {
      case 'daily-milk':
        return [
          { value: 'all', label: 'All Qualities' },
          { value: 'grade a', label: 'Grade A' },
          { value: 'grade b', label: 'Grade B' },
        ];
      case 'loans-overdue':
      case 'loan-risk':
        return [
          { value: 'all', label: 'All Risk Levels' },
          { value: 'low', label: 'Low Risk' },
          { value: 'medium', label: 'Medium Risk' },
          { value: 'high', label: 'High Risk' },
        ];
      default:
        return [
          { value: 'all', label: 'All Status' },
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
          { value: 'pending', label: 'Pending' },
        ];
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            {reportName} - Preview
          </DialogTitle>
        </DialogHeader>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-48">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {dateFrom ? format(dateFrom, "MMM dd") : "From Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateFrom}
                onSelect={setDateFrom}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-48">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {dateTo ? format(dateTo, "MMM dd") : "To Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateTo}
                onSelect={setDateTo}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {getFilterOptions().map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Showing {paginatedData.length} of {filteredData.length} records
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {getReportColumns().map((column) => (
                  <TableHead key={column}>{column}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item, index) => renderTableRow(item, index))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Generate Full Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportViewModal;
