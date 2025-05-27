
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
import { UserPlus, Users, CreditCard, Search, Plus, CheckCircle, Calendar, Phone, Mail, MapPin } from "lucide-react";
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
  status: 'active' | 'pending' | 'suspended';
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
  const [isEnrolling, setIsEnrolling] = useState(false);
  
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

  // Mock enrolled members data
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
      profilePhoto: '/api/placeholder/40/40',
      status: 'active'
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
      profilePhoto: '/api/placeholder/40/40',
      status: 'active'
    }
  ]);

  const generateMemberId = (): string => {
    const nextId = (enrolledMembers.length + 1).toString().padStart(3, '0');
    return `MEM${nextId}`;
  };

  const generateAccountNumber = (): string => {
    const year = new Date().getFullYear();
    const nextId = (enrolledMembers.length + 1).toString().padStart(3, '0');
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
        accountNumber: generateAccountNumber(),
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
        membershipType: formData.membershipType,
        initialDeposit: parseFloat(formData.initialDeposit) || 0,
        dateRegistered: new Date().toISOString().split('T')[0],
        profilePhoto: '/api/placeholder/40/40',
        status: 'active'
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
        title: "Enrollment Successful!",
        description: `Member ${newMember.fullName} has been enrolled with Account Number: ${newMember.accountNumber}`,
      });

    } catch (error) {
      toast({
        title: "Enrollment Failed",
        description: "Failed to enroll member. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsEnrolling(false);
    }
  };

  const filteredMembers = enrolledMembers.filter(member =>
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.accountNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-red-100 text-red-800'
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
        <Badge variant="outline" className="px-3 py-1">
          <Users className="h-4 w-4 mr-2" />
          {enrolledMembers.length} Total Members
        </Badge>
      </div>

      <Tabs defaultValue="enrolled" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="enrolled" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Enrolled Members
          </TabsTrigger>
          <TabsTrigger value="enroll" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            New Enrollment
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
                            <AvatarImage src={member.profilePhoto} />
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
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            {member.dateRegistered}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{member.accountNumber}</p>
                          <p className="text-sm text-gray-500">
                            Initial: {member.initialDeposit.toLocaleString()} RWF
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
                  <Label htmlFor="initialDeposit">Initial Deposit (RWF)</Label>
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
                      <span className="ml-2 font-mono">{generateAccountNumber()}</span>
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
                      Enrolling...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Enroll Member
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MemberEnrollmentPage;
