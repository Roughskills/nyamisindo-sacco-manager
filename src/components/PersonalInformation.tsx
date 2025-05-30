
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User, Save, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PersonalInformationProps {
  onComplete: (data: any) => void;
  data?: any;
}

const PersonalInformation = ({ onComplete, data }: PersonalInformationProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    middleName: data?.middleName || '',
    dateOfBirth: data?.dateOfBirth || '',
    gender: data?.gender || '',
    nationality: data?.nationality || '',
    phoneNumber: data?.phoneNumber || '',
    email: data?.email || '',
    address: data?.address || '',
    district: data?.district || '',
    sector: data?.sector || '',
    cell: data?.cell || '',
    village: data?.village || '',
    nextOfKinName: data?.nextOfKinName || '',
    nextOfKinPhone: data?.nextOfKinPhone || '',
    nextOfKinRelationship: data?.nextOfKinRelationship || '',
    occupation: data?.occupation || '',
    monthlyIncome: data?.monthlyIncome || '',
    educationLevel: data?.educationLevel || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.nationality.trim()) newErrors.nationality = 'Nationality is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.district.trim()) newErrors.district = 'District is required';
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation (basic)
    if (formData.phoneNumber && !/^\+?[\d\s-()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive"
      });
      return;
    }

    const personalInfoData = {
      ...formData,
      timestamp: new Date().toISOString()
    };

    onComplete(personalInfoData);
    
    toast({
      title: "Personal Information Saved!",
      description: "Personal information has been successfully recorded.",
    });
  };

  const isCompleted = data && Object.keys(data).length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <User className="h-5 w-5" />
            Personal Information
            {isCompleted && <CheckCircle2 className="h-5 w-5 text-green-600" />}
          </CardTitle>
          <p className="text-sm text-blue-700">
            Please provide your personal details for account registration
          </p>
        </CardHeader>
      </Card>

      {/* Personal Details Form */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Enter first name"
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            
            <div>
              <Label htmlFor="middleName">Middle Name</Label>
              <Input
                id="middleName"
                value={formData.middleName}
                onChange={(e) => handleInputChange('middleName', e.target.value)}
                placeholder="Enter middle name (optional)"
              />
            </div>
            
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter last name"
                className={errors.lastName ? 'border-red-500' : ''}
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className={errors.dateOfBirth ? 'border-red-500' : ''}
              />
              {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
            </div>
            
            <div>
              <Label htmlFor="gender">Gender *</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>
            
            <div>
              <Label htmlFor="nationality">Nationality *</Label>
              <Input
                id="nationality"
                value={formData.nationality}
                onChange={(e) => handleInputChange('nationality', e.target.value)}
                placeholder="e.g., Rwandan"
                className={errors.nationality ? 'border-red-500' : ''}
              />
              {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="+250 788 123 456"
                className={errors.phoneNumber ? 'border-red-500' : ''}
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="example@email.com"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>
          
          <div>
            <Label htmlFor="address">Physical Address *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter your physical address"
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Administrative Location */}
      <Card>
        <CardHeader>
          <CardTitle>Administrative Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="district">District *</Label>
              <Input
                id="district"
                value={formData.district}
                onChange={(e) => handleInputChange('district', e.target.value)}
                placeholder="Enter district"
                className={errors.district ? 'border-red-500' : ''}
              />
              {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
            </div>
            
            <div>
              <Label htmlFor="sector">Sector</Label>
              <Input
                id="sector"
                value={formData.sector}
                onChange={(e) => handleInputChange('sector', e.target.value)}
                placeholder="Enter sector"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cell">Cell</Label>
              <Input
                id="cell"
                value={formData.cell}
                onChange={(e) => handleInputChange('cell', e.target.value)}
                placeholder="Enter cell"
              />
            </div>
            
            <div>
              <Label htmlFor="village">Village</Label>
              <Input
                id="village"
                value={formData.village}
                onChange={(e) => handleInputChange('village', e.target.value)}
                placeholder="Enter village"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next of Kin Information */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contact (Next of Kin)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="nextOfKinName">Full Name</Label>
              <Input
                id="nextOfKinName"
                value={formData.nextOfKinName}
                onChange={(e) => handleInputChange('nextOfKinName', e.target.value)}
                placeholder="Next of kin name"
              />
            </div>
            
            <div>
              <Label htmlFor="nextOfKinPhone">Phone Number</Label>
              <Input
                id="nextOfKinPhone"
                value={formData.nextOfKinPhone}
                onChange={(e) => handleInputChange('nextOfKinPhone', e.target.value)}
                placeholder="Next of kin phone"
              />
            </div>
            
            <div>
              <Label htmlFor="nextOfKinRelationship">Relationship</Label>
              <Select value={formData.nextOfKinRelationship} onValueChange={(value) => handleInputChange('nextOfKinRelationship', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="child">Child</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="relative">Other Relative</SelectItem>
                  <SelectItem value="friend">Friend</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                value={formData.occupation}
                onChange={(e) => handleInputChange('occupation', e.target.value)}
                placeholder="Your occupation"
              />
            </div>
            
            <div>
              <Label htmlFor="monthlyIncome">Estimated Monthly Income</Label>
              <Select value={formData.monthlyIncome} onValueChange={(value) => handleInputChange('monthlyIncome', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select income range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="below-50000">Below 50,000 UGX</SelectItem>
                  <SelectItem value="50000-100000">50,000 - 100,000 UGX</SelectItem>
                  <SelectItem value="100000-200000">100,000 - 200,000 UGX</SelectItem>
                  <SelectItem value="200000-500000">200,000 - 500,000 UGX</SelectItem>
                  <SelectItem value="above-500000">Above 500,000 UGX</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="educationLevel">Education Level</Label>
              <Select value={formData.educationLevel} onValueChange={(value) => handleInputChange('educationLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="vocational">Vocational Training</SelectItem>
                  <SelectItem value="university">University</SelectItem>
                  <SelectItem value="postgraduate">Postgraduate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Display */}
      {isCompleted && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <Badge variant="default" className="bg-green-100 text-green-800">
                Information Complete
              </Badge>
              <span className="text-sm text-green-700">
                Personal information has been saved successfully
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="px-8 flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Personal Information
        </Button>
      </div>
    </div>
  );
};

export default PersonalInformation;
