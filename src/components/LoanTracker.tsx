
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const LoanTracker = () => {
  const loans = [
    {
      id: 1,
      farmerName: "John Muhire",
      amount: 500000,
      purpose: "Cow Purchase",
      disbursed: "2024-01-15",
      monthlyPayment: 45000,
      paid: 135000,
      remaining: 365000,
      status: "active",
      nextPayment: "2024-04-15"
    },
    {
      id: 2,
      farmerName: "Mary Uwimana",
      amount: 300000,
      purpose: "Farm Equipment",
      disbursed: "2024-02-01",
      monthlyPayment: 30000,
      paid: 90000,
      remaining: 210000,
      status: "active",
      nextPayment: "2024-04-01"
    },
    {
      id: 3,
      farmerName: "Grace Mukamana",
      amount: 750000,
      purpose: "Barn Construction",
      disbursed: "2023-10-01",
      monthlyPayment: 62500,
      paid: 375000,
      remaining: 375000,
      status: "active",
      nextPayment: "2024-04-01"
    },
    {
      id: 4,
      farmerName: "Peter Nkusi",
      amount: 200000,
      purpose: "Feed Purchase",
      disbursed: "2024-03-01",
      monthlyPayment: 20000,
      paid: 20000,
      remaining: 180000,
      status: "overdue",
      nextPayment: "2024-04-01"
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('rw-RW', {
      style: 'currency',
      currency: 'RWF',
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Loan Management</h2>
        <Button className="bg-green-600 hover:bg-green-700">New Loan Application</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-green-800">Total Active Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">23</div>
            <p className="text-sm text-gray-600">Worth 15.2M RWF</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-green-800">This Month Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">1.8M</div>
            <p className="text-sm text-gray-600">RWF collected</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-red-800">Overdue Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">3</div>
            <p className="text-sm text-gray-600">Require attention</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4">
        {loans.map((loan) => (
          <Card key={loan.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{loan.farmerName}</h3>
                  <p className="text-sm text-gray-600">{loan.purpose}</p>
                </div>
                <Badge className={getStatusColor(loan.status)}>
                  {loan.status.toUpperCase()}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Loan Amount</p>
                  <p className="font-semibold text-gray-900">{formatCurrency(loan.amount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Payment</p>
                  <p className="font-semibold text-gray-900">{formatCurrency(loan.monthlyPayment)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Amount Paid</p>
                  <p className="font-semibold text-green-600">{formatCurrency(loan.paid)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Remaining</p>
                  <p className="font-semibold text-gray-900">{formatCurrency(loan.remaining)}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Repayment Progress</span>
                  <span>{Math.round(getProgress(loan.paid, loan.amount))}%</span>
                </div>
                <Progress value={getProgress(loan.paid, loan.amount)} className="h-2" />
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Next Payment: <span className="font-medium">{loan.nextPayment}</span>
                </p>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">Record Payment</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LoanTracker;
