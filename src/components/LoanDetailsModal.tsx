
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, DollarSign, FileText, TrendingUp, User, Clock, AlertCircle } from "lucide-react";

interface Loan {
  id: number;
  farmerName: string;
  amount: number;
  purpose: string;
  disbursed: string;
  monthlyPayment: number;
  paid: number;
  remaining: number;
  status: string;
  nextPayment: string;
  interestRate?: number;
  termMonths?: number;
  farmerId?: string;
}

interface LoanDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  loan: Loan | null;
}

const LoanDetailsModal = ({ isOpen, onClose, loan }: LoanDetailsModalProps) => {
  if (!loan) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getProgress = (paid: number, total: number) => {
    return (paid / total) * 100;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Generate mock repayment schedule
  const generateRepaymentSchedule = () => {
    const schedule = [];
    const startDate = new Date(loan.disbursed);
    const termMonths = loan.termMonths || 12;
    
    for (let i = 0; i < termMonths; i++) {
      const paymentDate = new Date(startDate);
      paymentDate.setMonth(startDate.getMonth() + i + 1);
      
      const isPaid = i < Math.floor((loan.paid / loan.amount) * termMonths);
      const isOverdue = paymentDate < new Date() && !isPaid;
      
      schedule.push({
        month: i + 1,
        dueDate: paymentDate.toISOString().split('T')[0],
        principal: loan.monthlyPayment * 0.8,
        interest: loan.monthlyPayment * 0.2,
        totalPayment: loan.monthlyPayment,
        balance: loan.amount - (loan.monthlyPayment * (i + 1)),
        status: isPaid ? 'paid' : isOverdue ? 'overdue' : 'pending'
      });
    }
    
    return schedule;
  };

  const repaymentSchedule = generateRepaymentSchedule();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-800 flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Loan Details - {loan.farmerName}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Repayment Schedule</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Status & Progress */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Loan Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge className={getStatusColor(loan.status)} variant="secondary">
                    {loan.status.toUpperCase()}
                  </Badge>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Repayment Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Progress value={getProgress(loan.paid, loan.amount)} className="h-2" />
                    <p className="text-sm text-gray-600">
                      {Math.round(getProgress(loan.paid, loan.amount))}% Complete
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Next Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">{loan.nextPayment}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Borrower Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Borrower Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{loan.farmerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Farmer ID:</span>
                    <span className="font-medium">{loan.farmerId || 'F-001'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan Purpose:</span>
                    <span className="font-medium">{loan.purpose}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Loan Terms */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Loan Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan Amount:</span>
                    <span className="font-medium">{formatCurrency(loan.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Rate:</span>
                    <span className="font-medium">{loan.interestRate || 12.5}% per annum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Term:</span>
                    <span className="font-medium">{loan.termMonths || 12} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Payment:</span>
                    <span className="font-medium">{formatCurrency(loan.monthlyPayment)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(loan.paid)}</div>
                    <div className="text-sm text-gray-600">Amount Paid</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(loan.remaining)}</div>
                    <div className="text-sm text-gray-600">Remaining Balance</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{formatCurrency(loan.monthlyPayment)}</div>
                    <div className="text-sm text-gray-600">Monthly Payment</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{loan.disbursed}</div>
                    <div className="text-sm text-gray-600">Disbursement Date</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Repayment Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment #</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Principal</TableHead>
                      <TableHead>Interest</TableHead>
                      <TableHead>Total Payment</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {repaymentSchedule.map((payment) => (
                      <TableRow key={payment.month}>
                        <TableCell className="font-medium">{payment.month}</TableCell>
                        <TableCell>{payment.dueDate}</TableCell>
                        <TableCell>{formatCurrency(payment.principal)}</TableCell>
                        <TableCell>{formatCurrency(payment.interest)}</TableCell>
                        <TableCell className="font-medium">{formatCurrency(payment.totalPayment)}</TableCell>
                        <TableCell>{formatCurrency(Math.max(0, payment.balance))}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary"
                            className={
                              payment.status === 'paid' ? 'bg-green-100 text-green-800' :
                              payment.status === 'overdue' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }
                          >
                            {payment.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Payment History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Mock payment history */}
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Payment Received</p>
                        <p className="text-sm text-gray-600">March 15, 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">{formatCurrency(loan.monthlyPayment)}</p>
                        <p className="text-sm text-gray-600">On Time</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Payment Received</p>
                        <p className="text-sm text-gray-600">February 15, 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">{formatCurrency(loan.monthlyPayment)}</p>
                        <p className="text-sm text-gray-600">On Time</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Loan Disbursed</p>
                        <p className="text-sm text-gray-600">{loan.disbursed}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-blue-600">{formatCurrency(loan.amount)}</p>
                        <p className="text-sm text-gray-600">Initial Disbursement</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            Record Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoanDetailsModal;
