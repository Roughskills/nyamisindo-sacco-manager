import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, CreditCard, Shield, FileText, Camera, CheckCircle2, AlertCircle, Clock, Search, Eye, Download, Calendar, ArrowUpDown } from "lucide-react";
import AccountRegistrationForm from "./AccountRegistrationForm";
import KYCVerification from "./KYCVerification";
import IDVerification from "./IDVerification";
import LivenessDetection from "./LivenessDetection";
import PhotoUpload from "./PhotoUpload";

interface RegistrationStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  component: React.ComponentType<any>;
}

interface ExistingMember {
  memberId: string;
  accountNumber: string;
  fullName: string;
  email: string;
  phone: string;
  profilePhoto: string;
  savingsBalance: number;
  loanBalance: number;
  accountStatus: 'active' | 'dormant' | 'closed';
  dateJoined: string;
  lastTransaction: string;
}

interface Transaction {
  id: string;
  date: string;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'loan_payment' | 'loan_disbursement';
  amount: number;
  description: string;
  balance: number;
  reference: string;
}

const AccountManagementPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [accountSearchTerm, setAccountSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<ExistingMember | null>(null);
  const [viewMode, setViewMode] = useState<'profile' | 'savings' | 'loan'>('profile');
  const [isRegistrationCompleted, setIsRegistrationCompleted] = useState(false);
  
  const [registrationData, setRegistrationData] = useState({
    personalInfo: {},
    kycData: {},
    idVerification: {},
    livenessResult: null,
    photos: {}
  });

  // Track completion status of each step
  const [stepCompletionStatus, setStepCompletionStatus] = useState({
    'personal-info': false,
    'kyc': false,
    'id-verification': false,
    'liveness': false,
    'photo-upload': false
  });

  // Mock existing members data
  const existingMembers: ExistingMember[] = [
    {
      memberId: 'MEM001',
      accountNumber: 'SAV2024001',
      fullName: 'Jean Baptiste Uwimana',
      email: 'jean.uwimana@email.com',
      phone: '+250788123456',
      profilePhoto: '/lovable-uploads/32cc625f-c0ad-42ea-ade9-1bf9d73d9ed0.png',
      savingsBalance: 850000,
      loanBalance: 0,
      accountStatus: 'active',
      dateJoined: '2024-01-15',
      lastTransaction: '2024-01-25'
    },
    {
      memberId: 'MEM002',
      accountNumber: 'SAV2024002',
      fullName: 'Marie Claire Mukamana',
      email: 'marie.mukamana@email.com',
      phone: '+250788654321',
      profilePhoto: '/lovable-uploads/39bf3300-da67-4e46-aa6e-89ee8efaba00.png',
      savingsBalance: 1200000,
      loanBalance: 500000,
      accountStatus: 'active',
      dateJoined: '2024-01-20',
      lastTransaction: '2024-01-24'
    },
    {
      memberId: 'MEM003',
      accountNumber: 'SAV2024003',
      fullName: 'David Nkurunziza',
      email: 'david.nkurunziza@email.com',
      phone: '+250788987654',
      profilePhoto: '/lovable-uploads/40e63c42-bf7a-4837-82b2-a3ed1de37147.png',
      savingsBalance: 450000,
      loanBalance: 200000,
      accountStatus: 'active',
      dateJoined: '2024-01-25',
      lastTransaction: '2024-01-23'
    }
  ];

  // Mock transaction data
  const savingsTransactions: Transaction[] = [
    {
      id: 'TXN001',
      date: '2024-01-25',
      type: 'deposit',
      amount: 50000,
      description: 'Monthly Savings Deposit',
      balance: 850000,
      reference: 'DEP2024001'
    },
    {
      id: 'TXN002',
      date: '2024-01-20',
      type: 'deposit',
      amount: 100000,
      description: 'Initial Deposit',
      balance: 800000,
      reference: 'DEP2024002'
    },
    {
      id: 'TXN003',
      date: '2024-01-18',
      type: 'withdrawal',
      amount: 25000,
      description: 'Emergency Withdrawal',
      balance: 700000,
      reference: 'WDR2024001'
    }
  ];

  const loanTransactions: Transaction[] = [
    {
      id: 'LTX001',
      date: '2024-01-22',
      type: 'loan_disbursement',
      amount: 500000,
      description: 'Business Loan Disbursement',
      balance: 500000,
      reference: 'LOAN2024001'
    },
    {
      id: 'LTX002',
      date: '2024-01-24',
      type: 'loan_payment',
      amount: 50000,
      description: 'Monthly Loan Payment',
      balance: 450000,
      reference: 'LPY2024001'
    }
  ];

  const getStepStatus = (stepId: string): 'pending' | 'in-progress' | 'completed' | 'failed' => {
    if (stepCompletionStatus[stepId as keyof typeof stepCompletionStatus]) {
      return 'completed';
    }
    if (steps.findIndex(step => step.id === stepId) === activeStep) {
      return 'in-progress';
    }
    return 'pending';
  };

  const steps: RegistrationStep[] = [
    {
      id: 'personal-info',
      title: 'Personal Information',
      description: 'Basic account holder information',
      status: getStepStatus('personal-info'),
      component: AccountRegistrationForm
    },
    {
      id: 'kyc',
      title: 'KYC Verification',
      description: 'Know Your Customer verification',
      status: getStepStatus('kyc'),
      component: KYCVerification
    },
    {
      id: 'id-verification',
      title: 'ID Verification',
      description: 'Government ID document verification',
      status: getStepStatus('id-verification'),
      component: IDVerification
    },
    {
      id: 'liveness',
      title: 'Liveness Detection',
      description: 'Biometric liveness verification',
      status: getStepStatus('liveness'),
      component: LivenessDetection
    },
    {
      id: 'photo-upload',
      title: 'Photo Upload',
      description: 'Profile and supporting documents',
      status: getStepStatus('photo-upload'),
      component: PhotoUpload
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccountStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'dormant':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStepComplete = (stepData: any) => {
    const currentStep = steps[activeStep];
    
    // Update registration data
    setRegistrationData(prev => ({
      ...prev,
      [currentStep.id.replace('-', '')]: stepData
    }));
    
    // Mark current step as completed
    setStepCompletionStatus(prev => ({
      ...prev,
      [currentStep.id]: true
    }));
    
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      // Registration is completed when all steps are done
      setIsRegistrationCompleted(true);
    }
  };

  const filteredMembers = existingMembers.filter(member =>
    member.fullName.toLowerCase().includes(accountSearchTerm.toLowerCase()) ||
    member.memberId.toLowerCase().includes(accountSearchTerm.toLowerCase()) ||
    member.accountNumber.toLowerCase().includes(accountSearchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(accountSearchTerm.toLowerCase())
  );

  const CurrentStepComponent = steps[activeStep]?.component;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Account Management</h1>
          <p className="text-gray-600 mt-2">Manage member savings accounts and registration process</p>
        </div>
        <Badge 
          variant="outline" 
          className={`px-3 py-1 ${
            isRegistrationCompleted 
              ? 'bg-green-100 text-green-800 border-green-300' 
              : 'bg-gray-100 text-gray-800 border-gray-300'
          }`}
        >
          <Shield className="h-4 w-4 mr-2" />
          {isRegistrationCompleted ? 'Registration Secured' : 'Secure Registration'}
        </Badge>
      </div>

      <Tabs defaultValue="registration" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="registration" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            New Registration
          </TabsTrigger>
          <TabsTrigger value="accounts" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Existing Accounts
          </TabsTrigger>
          <TabsTrigger value="verification" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Pending Verifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="registration" className="space-y-6">
          {/* Progress Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Account Registration Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      index === activeStep
                        ? 'border-blue-500 bg-blue-50'
                        : step.status === 'completed'
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                    onClick={() => index <= activeStep && setActiveStep(index)}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="flex-shrink-0">
                        {getStatusIcon(step.status)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{step.title}</h3>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                      <Badge className={getStatusColor(step.status)}>
                        {step.status.charAt(0).toUpperCase() + step.status.slice(1).replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Step Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Step {activeStep + 1}:</span>
                {steps[activeStep]?.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {CurrentStepComponent && (
                <CurrentStepComponent
                  onComplete={handleStepComplete}
                  data={registrationData}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-6">
          {/* Search Bar */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, member ID, account number, or email..."
                  value={accountSearchTerm}
                  onChange={(e) => setAccountSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {!selectedMember ? (
            /* Member Search Results */
            <Card>
              <CardHeader>
                <CardTitle>Member Accounts ({filteredMembers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredMembers.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>No accounts found matching your search</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredMembers.map((member) => (
                      <div
                        key={member.memberId}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedMember(member)}
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={member.profilePhoto} alt={member.fullName} />
                            <AvatarFallback>{member.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{member.fullName}</h3>
                            <p className="text-sm text-gray-600">ID: {member.memberId} | Account: {member.accountNumber}</p>
                            <p className="text-sm text-gray-500">{member.email} | {member.phone}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getAccountStatusColor(member.accountStatus)}>
                              {member.accountStatus.charAt(0).toUpperCase() + member.accountStatus.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium">Savings: {member.savingsBalance.toLocaleString()}</p>
                          {member.loanBalance > 0 && (
                            <p className="text-sm text-red-600">Loan: {member.loanBalance.toLocaleString()}</p>
                          )}
                          <Button variant="outline" size="sm" className="mt-2">
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            /* Selected Member Details */
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Account Profile
                    </CardTitle>
                    <Button variant="outline" onClick={() => setSelectedMember(null)}>
                      Back to Search
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={selectedMember.profilePhoto} alt={selectedMember.fullName} />
                      <AvatarFallback className="text-xl">{selectedMember.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold">{selectedMember.fullName}</h2>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-600">Member ID</p>
                          <p className="font-medium">{selectedMember.memberId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Account Number</p>
                          <p className="font-medium">{selectedMember.accountNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-medium">{selectedMember.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="font-medium">{selectedMember.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Date Joined</p>
                          <p className="font-medium">{selectedMember.dateJoined}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Status</p>
                          <Badge className={getAccountStatusColor(selectedMember.accountStatus)}>
                            {selectedMember.accountStatus.charAt(0).toUpperCase() + selectedMember.accountStatus.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="space-y-2">
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-sm text-green-700">Savings Balance</p>
                          <p className="text-xl font-bold text-green-800">{selectedMember.savingsBalance.toLocaleString()}</p>
                        </div>
                        {selectedMember.loanBalance > 0 && (
                          <div className="p-3 bg-red-50 rounded-lg">
                            <p className="text-sm text-red-700">Loan Balance</p>
                            <p className="text-xl font-bold text-red-800">{selectedMember.loanBalance.toLocaleString()}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Statement Tabs */}
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'profile' | 'savings' | 'loan')} className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile">Account Overview</TabsTrigger>
                  <TabsTrigger value="savings">Savings Statement</TabsTrigger>
                  <TabsTrigger value="loan">Loan Statement</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <h3 className="font-medium text-blue-900">Total Savings</h3>
                          <p className="text-2xl font-bold text-blue-800">{selectedMember.savingsBalance.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <h3 className="font-medium text-red-900">Outstanding Loans</h3>
                          <p className="text-2xl font-bold text-red-800">{selectedMember.loanBalance.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <h3 className="font-medium text-green-900">Last Transaction</h3>
                          <p className="text-lg font-bold text-green-800">{selectedMember.lastTransaction}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="savings" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          Savings Account Statement
                        </CardTitle>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Reference</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-right">Balance</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {savingsTransactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                              <TableCell className="flex items-center gap-2">
                                <Calendar className="h-3 w-3 text-gray-400" />
                                {transaction.date}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <ArrowUpDown className={`h-3 w-3 ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`} />
                                  {transaction.description}
                                </div>
                              </TableCell>
                              <TableCell className="font-mono text-sm">{transaction.reference}</TableCell>
                              <TableCell className={`text-right font-medium ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                                {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount.toLocaleString()}
                              </TableCell>
                              <TableCell className="text-right font-medium">{transaction.balance.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="loan" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Loan Account Statement
                        </CardTitle>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {selectedMember.loanBalance === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <p>No active loans for this member</p>
                        </div>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead>Reference</TableHead>
                              <TableHead className="text-right">Amount</TableHead>
                              <TableHead className="text-right">Outstanding Balance</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {loanTransactions.map((transaction) => (
                              <TableRow key={transaction.id}>
                                <TableCell className="flex items-center gap-2">
                                  <Calendar className="h-3 w-3 text-gray-400" />
                                  {transaction.date}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <ArrowUpDown className={`h-3 w-3 ${transaction.type === 'loan_disbursement' ? 'text-blue-600' : 'text-green-600'}`} />
                                    {transaction.description}
                                  </div>
                                </TableCell>
                                <TableCell className="font-mono text-sm">{transaction.reference}</TableCell>
                                <TableCell className={`text-right font-medium ${transaction.type === 'loan_disbursement' ? 'text-blue-600' : 'text-green-600'}`}>
                                  {transaction.type === 'loan_disbursement' ? '+' : '-'}{transaction.amount.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right font-medium">{transaction.balance.toLocaleString()}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Verifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No pending verifications</p>
                <p className="text-sm">Account verification requests will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountManagementPage;
