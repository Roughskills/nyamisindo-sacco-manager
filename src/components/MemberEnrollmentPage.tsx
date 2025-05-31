
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserPlus, Users, CreditCard, Search, Plus, CheckCircle, Calendar, Phone, Mail, MapPin, Clock, UserCheck, X, Check, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EnrolledMember {
  memberId: string;
  accountNumber: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  membershipType: string;
  initialDeposit: number;
  dateRegistered: string;
  profilePhoto: string;
  status: 'active' | 'pending' | 'suspended' | 'rejected';
  submittedBy?: string;
  submissionDate?: string;
  reviewedBy?: string;
  reviewDate?: string;
  reviewComments?: string;
}

interface EnrollmentFormData {
  fullName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  address: string;
  membershipType: string;
  initialDeposit: string;
  profilePhoto: File | null;
}

const MemberEnrollmentPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [supervisionSearchTerm, setSupervisionSearchTerm] = useState('');
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<EnrollmentFormData>({
    fullName: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    address: '',
    membershipType: '',
    initialDeposit: '',
    profilePhoto: null
  });

  // Mock enrolled members data with supervision workflow
  const [enrolledMembers, setEnrolledMembers] = useState<EnrolledMember[]>([
    {
      memberId: 'MEM001',
      accountNumber: 'SAV2024001',
      fullName: 'Jean Baptiste Uwimana',
      email: 'jean.uwimana@email.com',
      phone: '+250788123456',
      dateOfBirth: '1985-03-15',
      address: 'Kigali, Gasabo District',
      membershipType: 'Regular',
      initialDeposit: 50000,
      dateRegistered: '2024-01-15',
      profilePhoto: '/lovable-uploads/32cc625f-c0ad-42ea-ade9-1bf9d73d9ed0.png',
      status: 'active',
      submittedBy: 'Admin User',
      submissionDate: '2024-01-15',
      reviewedBy: 'Supervisor A',
      reviewDate: '2024-01-15'
    },
    {
      memberId: 'MEM002',
      accountNumber: 'SAV2024002',
      fullName: 'Marie Claire Mukamana',
      email: 'marie.mukamana@email.com',
      phone: '+250788654321',
      dateOfBirth: '1990-07-22',
      address: 'Kigali, Kicukiro District',
      membershipType: 'Premium',
      initialDeposit: 100000,
      dateRegistered: '2024-01-20',
      profilePhoto: '/lovable-uploads/39bf3300-da67-4e46-aa6e-89ee8efaba00.png',
      status: 'active',
      submittedBy: 'Admin User',
      submissionDate: '2024-01-20',
      reviewedBy: 'Supervisor B',
      reviewDate: '2024-01-20'
    },
    {
      memberId: 'MEM003',
      accountNumber: '',
      fullName: 'David Nkurunziza',
      email: 'david.nkurunziza@email.com',
      phone: '+250788987654',
      dateOfBirth: '1988-05-10',
      address: 'Kigali, Nyarugenge District',
      membershipType: 'Regular',
      initialDeposit: 25000,
      dateRegistered: '',
      profilePhoto: '/lovable-uploads/40e63c42-bf7a-4837-82b2-a3ed1de37147.png',
      status: 'pending',
      submittedBy: 'Admin User',
      submissionDate: '2024-01-25'
    },
    {
      memberId: 'MEM004',
      accountNumber: '',
      fullName: 'Sarah Uwimana',
      email: 'sarah.uwimana@email.com',
      phone: '+250788456789',
      dateOfBirth: '1992-12-03',
      address: 'Kigali, Gasabo District',
      membershipType: 'Student',
      initialDeposit: 10000,
      dateRegistered: '',
      profilePhoto: '/lovable-uploads/4f5c5c7a-a091-4327-a01f-8a9ed50b0e17.png',
      status: 'pending',
      submittedBy: 'Admin User',
      submissionDate: '2024-01-26'
    }
  ]);

  const generateMemberId = (): string => {
    const nextId = (enrolledMembers.length + 1).toString().padStart(3, '0');
    return `MEM${nextId}`;
  };

  const generateAccountNumber = (): string => {
    const year = new Date().getFullYear();
    const nextId = (enrolledMembers.filter(m => m.status === 'active').length + 1).toString().padStart(3, '0');
    return `SAV${year}${nextId}`;
  };

  const handleInputChange = (field: keyof EnrollmentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, profilePhoto: file }));
  };

  const validateForm = (): boolean => {
    const required = ['fullName', 'dateOfBirth', 'phone', 'email', 'address', 'membershipType'];
    return required.every(field => formData[field as keyof EnrollmentFormData]);
  };

  const handleEnrollment = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsEnrolling(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newMember: EnrolledMember = {
        memberId: generateMemberId(),
        accountNumber: '', // Will be generated upon approval
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
        membershipType: formData.membershipType,
        initialDeposit: parseFloat(formData.initialDeposit) || 0,
        dateRegistered: '',
        profilePhoto: '/lovable-uploads/5270e3a7-68c7-4872-8bb8-3577295649b2.png',
        status: 'pending',
        submittedBy: 'Current User', // Would be the actual logged-in user
        submissionDate: new Date().toISOString().split('T')[0]
      };

      setEnrolledMembers(prev => [...prev, newMember]);

      // Reset form
      setFormData({
        fullName: '',
        dateOfBirth: '',
        phone: '',
        email: '',
        address: '',
        membershipType: '',
        initialDeposit: '',
        profilePhoto: null
      });

      toast({
        title: "Enrollment Submitted!",
        description: `Member ${newMember.fullName} has been submitted for supervisor approval.`,
      });

    } catch (error) {
      toast({
        title: "Enrollment Failed",
        description: "Failed to submit enrollment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleSupervisionAction = async (memberId: string, action: 'approve' | 'reject', comments?: string) => {
    setIsProcessing(memberId);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setEnrolledMembers(prev => prev.map(member => {
        if (member.memberId === memberId) {
          const updatedMember = {
            ...member,
            status: action === 'approve' ? 'active' as const : 'rejected' as const,
            reviewedBy: 'Current Supervisor', // Would be the actual logged-in supervisor
            reviewDate: new Date().toISOString().split('T')[0],
            reviewComments: comments
          };

          // Generate account number if approved
          if (action === 'approve') {
            updatedMember.accountNumber = generateAccountNumber();
            updatedMember.dateRegistered = new Date().toISOString().split('T')[0];
          }

          return updatedMember;
        }
        return member;
      }));

      toast({
        title: action === 'approve' ? "Member Approved!" : "Member Rejected",
        description: action === 'approve' 
          ? "Member enrollment has been approved and account created."
          : "Member enrollment has been rejected.",
        variant: action === 'approve' ? "default" : "destructive"
      });

    } catch (error) {
      toast({
        title: "Action Failed",
        description: "Failed to process the request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(null);
    }
  };

  const filteredMembers = enrolledMembers.filter(member =>
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.accountNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingMembers = enrolledMembers.filter(member => 
    member.status === 'pending' &&
    (member.fullName.toLowerCase().includes(supervisionSearchTerm.toLowerCase()) ||
     member.memberId.toLowerCase().includes(supervisionSearchTerm.toLowerCase()))
  );

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-red-100 text-red-800',
      rejected: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Member Enrollment</h1>
          <p className="text-gray-600 mt-2">Enroll new members and manage existing enrollments</p>
        </div>
        <div className="flex gap-4">
          <Badge variant="outline" className="px-3 py-1">
            <Users className="h-4 w-4 mr-2" />
            {enrolledMembers.filter(m => m.status === 'active').length} Active Members
          </Badge>
          <Badge variant="outline" className="px-3 py-1 bg-yellow-50">
            <Clock className="h-4 w-4 mr-2" />
            {pendingMembers.length} Pending Approval
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="enrolled" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="enrolled" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Enrolled Members
          </TabsTrigger>
          <TabsTrigger value="enroll" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            New Enrollment
          </TabsTrigger>
          <TabsTrigger value="supervision" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Supervision ({pendingMembers.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="enrolled" className="space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, member ID, or account number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Members Table */}
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Members</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member Info</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Membership</TableHead>
                    <TableHead>Account Details</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.memberId}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={member.profilePhoto} alt={member.fullName} />
                            <AvatarFallback>{member.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.fullName}</p>
                            <p className="text-sm text-gray-500">ID: {member.memberId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1 text-gray-400" />
                            {member.phone}
                          </div>
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1 text-gray-400" />
                            {member.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                            {member.address}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{member.membershipType}</p>
                          {member.dateRegistered && (
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-3 w-3 mr-1" />
                              {member.dateRegistered}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{member.accountNumber || 'Pending'}</p>
                          <p className="text-sm text-gray-500">
                            Initial: {member.initialDeposit.toLocaleString()} UGX
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(member.status)}>
                          {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enroll" className="space-y-6">
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Member Enrollment Form
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+250 XXX XXX XXX"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="member@email.com"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Full address including district and sector"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="membershipType">Membership Type *</Label>
                  <Select value={formData.membershipType} onValueChange={(value) => handleInputChange('membershipType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select membership type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular">Regular Member</SelectItem>
                      <SelectItem value="premium">Premium Member</SelectItem>
                      <SelectItem value="student">Student Member</SelectItem>
                      <SelectItem value="senior">Senior Member</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="initialDeposit">Initial Deposit (UGX)</Label>
                  <Input
                    id="initialDeposit"
                    type="number"
                    value={formData.initialDeposit}
                    onChange={(e) => handleInputChange('initialDeposit', e.target.value)}
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="profilePhoto">Profile Photo</Label>
                  <Input
                    id="profilePhoto"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Auto-Generated Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-700">Member ID:</span>
                      <span className="ml-2 font-mono">{generateMemberId()}</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Account Number:</span>
                      <span className="ml-2 font-mono text-yellow-600">Generated after approval</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setFormData({
                    fullName: '',
                    dateOfBirth: '',
                    phone: '',
                    email: '',
                    address: '',
                    membershipType: '',
                    initialDeposit: '',
                    profilePhoto: null
                  })}
                >
                  Clear Form
                </Button>
                <Button
                  onClick={handleEnrollment}
                  disabled={isEnrolling || !validateForm()}
                  className="min-w-[140px]"
                >
                  {isEnrolling ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Submit for Approval
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supervision" className="space-y-6">
          {/* Search for pending members */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search pending enrollments..."
                  value={supervisionSearchTerm}
                  onChange={(e) => setSupervisionSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pending Enrollments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Pending Member Enrollments ({pendingMembers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pendingMembers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No pending enrollments for review</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingMembers.map((member) => (
                    <div key={member.memberId} className="border rounded-lg p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={member.profilePhoto} alt={member.fullName} />
                            <AvatarFallback className="text-lg">
                              {member.fullName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold">{member.fullName}</h3>
                            <p className="text-sm text-gray-500">Member ID: {member.memberId}</p>
                            <div className="flex items-center mt-2">
                              <Badge className="bg-yellow-100 text-yellow-800">
                                <Clock className="h-3 w-3 mr-1" />
                                Pending Review
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <p>Submitted by: {member.submittedBy}</p>
                          <p>Date: {member.submissionDate}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Contact Information</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center">
                              <Phone className="h-3 w-3 mr-2 text-gray-400" />
                              {member.phone}
                            </div>
                            <div className="flex items-center">
                              <Mail className="h-3 w-3 mr-2 text-gray-400" />
                              {member.email}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-2 text-gray-400" />
                              {member.address}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Membership Details</h4>
                          <div className="space-y-1 text-sm">
                            <p><span className="text-gray-600">Type:</span> {member.membershipType}</p>
                            <p><span className="text-gray-600">Date of Birth:</span> {member.dateOfBirth}</p>
                            <p><span className="text-gray-600">Initial Deposit:</span> {member.initialDeposit.toLocaleString()} UGX</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Actions</h4>
                          <div className="space-y-2">
                            <Button
                              size="sm"
                              onClick={() => handleSupervisionAction(member.memberId, 'approve')}
                              disabled={isProcessing === member.memberId}
                              className="w-full bg-green-600 hover:bg-green-700"
                            >
                              {isProcessing === member.memberId ? (
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                              ) : (
                                <Check className="h-3 w-3 mr-2" />
                              )}
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleSupervisionAction(member.memberId, 'reject', 'Incomplete documentation')}
                              disabled={isProcessing === member.memberId}
                              className="w-full"
                            >
                              <X className="h-3 w-3 mr-2" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MemberEnrollmentPage;
