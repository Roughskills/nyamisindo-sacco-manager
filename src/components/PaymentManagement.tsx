
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CreditCard, Smartphone, Building2, CheckCircle2, Clock, AlertCircle, DollarSign } from "lucide-react";

interface Payment {
  id: string;
  farmerName: string;
  amount: number;
  method: 'airtel' | 'mtn' | 'bank';
  reference: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  description: string;
}

const PaymentManagement = () => {
  const [activeTab, setActiveTab] = useState('make-payment');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentData, setPaymentData] = useState({
    farmerName: '',
    amount: '',
    description: '',
    // Airtel Money fields
    airtelPhone: '',
    // MTN Mobile Money fields
    mtnPhone: '',
    // Bank deposit fields
    bankName: '',
    accountNumber: '',
    accountName: '',
    branchCode: ''
  });

  const recentPayments: Payment[] = [
    {
      id: '1',
      farmerName: 'John Muhire',
      amount: 45000,
      method: 'airtel',
      reference: 'AM123456789',
      status: 'completed',
      date: '2024-01-15',
      description: 'Monthly milk payment'
    },
    {
      id: '2',
      farmerName: 'Mary Uwimana',
      amount: 32000,
      method: 'mtn',
      reference: 'MM987654321',
      status: 'pending',
      date: '2024-01-15',
      description: 'Loan disbursement'
    },
    {
      id: '3',
      farmerName: 'Grace Mukamana',
      amount: 78000,
      method: 'bank',
      reference: 'BNK202401001',
      status: 'completed',
      date: '2024-01-14',
      description: 'Bonus payment'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'airtel':
        return <Smartphone className="h-4 w-4 text-red-600" />;
      case 'mtn':
        return <Smartphone className="h-4 w-4 text-yellow-600" />;
      case 'bank':
        return <Building2 className="h-4 w-4 text-blue-600" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setPaymentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitPayment = () => {
    console.log('Payment submitted:', { paymentMethod, paymentData });
    // Here you would integrate with actual payment APIs
    alert('Payment initiated successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Payment Management</h2>
        <div className="flex gap-2">
          <Button variant="outline">Export Report</Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <DollarSign className="h-4 w-4 mr-2" />
            Bulk Payment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-green-800">Total Payments Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">2.3M</div>
            <p className="text-sm text-gray-600">UGX processed</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-blue-800">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">8</div>
            <p className="text-sm text-gray-600">Awaiting processing</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-yellow-800">Mobile Money</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">85%</div>
            <p className="text-sm text-gray-600">Of total payments</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-purple-800">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">97.2%</div>
            <p className="text-sm text-gray-600">Payment success</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="make-payment">Make Payment</TabsTrigger>
          <TabsTrigger value="payment-history">Payment History</TabsTrigger>
          <TabsTrigger value="reconciliation">Reconciliation</TabsTrigger>
        </TabsList>

        <TabsContent value="make-payment" className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>New Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmerName">Farmer Name</Label>
                  <Input
                    id="farmerName"
                    placeholder="Select or enter farmer name"
                    value={paymentData.farmerName}
                    onChange={(e) => handleInputChange('farmerName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (UGX)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={paymentData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Payment description or purpose"
                  value={paymentData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <Label>Payment Method</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      paymentMethod === 'airtel' ? 'ring-2 ring-red-500 bg-red-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setPaymentMethod('airtel')}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="w-16 h-16 mx-auto mb-2 bg-red-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">A</span>
                      </div>
                      <h3 className="font-semibold text-red-600">Airtel Money</h3>
                      <p className="text-sm text-gray-600">Mobile payment</p>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      paymentMethod === 'mtn' ? 'ring-2 ring-yellow-500 bg-yellow-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setPaymentMethod('mtn')}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="w-16 h-16 mx-auto mb-2 bg-yellow-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">MTN</span>
                      </div>
                      <h3 className="font-semibold text-yellow-600">MTN Mobile Money</h3>
                      <p className="text-sm text-gray-600">Mobile payment</p>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      paymentMethod === 'bank' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setPaymentMethod('bank')}
                  >
                    <CardContent className="p-4 text-center">
                      <Building2 className="w-16 h-16 mx-auto mb-2 text-blue-600" />
                      <h3 className="font-semibold text-blue-600">Bank Deposit</h3>
                      <p className="text-sm text-gray-600">Bank transfer</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {paymentMethod === 'airtel' && (
                <Card className="bg-red-50 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-800">Airtel Money Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="airtelPhone">Airtel Money Phone Number</Label>
                      <Input
                        id="airtelPhone"
                        placeholder="075XXXXXXX or 070XXXXXXX"
                        value={paymentData.airtelPhone}
                        onChange={(e) => handleInputChange('airtelPhone', e.target.value)}
                      />
                    </div>
                    <div className="text-sm text-red-700 bg-red-100 p-3 rounded">
                      <strong>Note:</strong> Ensure the phone number is registered for Airtel Money service.
                    </div>
                  </CardContent>
                </Card>
              )}

              {paymentMethod === 'mtn' && (
                <Card className="bg-yellow-50 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-yellow-800">MTN Mobile Money Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="mtnPhone">MTN Mobile Money Phone Number</Label>
                      <Input
                        id="mtnPhone"
                        placeholder="078XXXXXXX or 039XXXXXXX"
                        value={paymentData.mtnPhone}
                        onChange={(e) => handleInputChange('mtnPhone', e.target.value)}
                      />
                    </div>
                    <div className="text-sm text-yellow-700 bg-yellow-100 p-3 rounded">
                      <strong>Note:</strong> Ensure the phone number is registered for MTN Mobile Money service.
                    </div>
                  </CardContent>
                </Card>
              )}

              {paymentMethod === 'bank' && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-800">Bank Deposit Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Select onValueChange={(value) => handleInputChange('bankName', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select bank" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kcb">KCB Bank Uganda</SelectItem>
                            <SelectItem value="centenary">Centenary Bank</SelectItem>
                            <SelectItem value="stanbic">Stanbic Bank</SelectItem>
                            <SelectItem value="equity">Equity Bank</SelectItem>
                            <SelectItem value="dfcu">DFCU Bank</SelectItem>
                            <SelectItem value="postbank">PostBank Uganda</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input
                          id="accountNumber"
                          placeholder="Enter account number"
                          value={paymentData.accountNumber}
                          onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="accountName">Account Name</Label>
                        <Input
                          id="accountName"
                          placeholder="Account holder name"
                          value={paymentData.accountName}
                          onChange={(e) => handleInputChange('accountName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="branchCode">Branch Code (Optional)</Label>
                        <Input
                          id="branchCode"
                          placeholder="Branch code"
                          value={paymentData.branchCode}
                          onChange={(e) => handleInputChange('branchCode', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-blue-700 bg-blue-100 p-3 rounded">
                      <strong>Note:</strong> Bank transfers may take 1-3 business days to process.
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline">Save as Draft</Button>
                <Button 
                  onClick={handleSubmitPayment}
                  disabled={!paymentMethod || !paymentData.farmerName || !paymentData.amount}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Process Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment-history" className="space-y-6">
          <div className="grid gap-4">
            {recentPayments.map((payment) => (
              <Card key={payment.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getMethodIcon(payment.method)}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{payment.farmerName}</h3>
                        <p className="text-sm text-gray-600">{payment.description}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="font-semibold text-gray-900">{formatCurrency(payment.amount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Method</p>
                      <p className="font-semibold text-gray-900 capitalize">{payment.method} {payment.method !== 'bank' ? 'Money' : 'Transfer'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Reference</p>
                      <p className="font-semibold text-gray-900">{payment.reference}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold text-gray-900">{payment.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4 gap-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    {payment.status === 'failed' && (
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">Retry Payment</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reconciliation" className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Payment Reconciliation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-600" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Reconciliation Dashboard</h3>
                <p className="text-gray-600 mb-6">Match payments with bank statements and mobile money reports</p>
                <Button className="bg-green-600 hover:bg-green-700">Start Reconciliation</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentManagement;
