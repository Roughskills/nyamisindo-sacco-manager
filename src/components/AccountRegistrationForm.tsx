
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarDays, MapPin, Phone, Mail, User } from "lucide-react";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  occupation: string;
  employer: string;
  monthlyIncome: string;
  sourceOfIncome: string;
  maritalStatus: string;
  dependents: string;
  nextOfKinName: string;
  nextOfKinPhone: string;
  nextOfKinRelationship: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
}

interface AccountRegistrationFormProps {
  onComplete: (data: PersonalInfo) => void;
  data?: any;
}

const AccountRegistrationForm = ({ onComplete, data }: AccountRegistrationFormProps) => {
  const [formData, setFormData] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    middleName: '',
    dateOfBirth: '',
    gender: '',
    nationality: 'Rwandan',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    occupation: '',
    employer: '',
    monthlyIncome: '',
    sourceOfIncome: '',
    maritalStatus: '',
    dependents: '0',
    nextOfKinName: '',
    nextOfKinPhone: '',
    nextOfKinRelationship: '',
    termsAccepted: false,
    privacyAccepted: false,
    ...data?.personalInfo
  });

  const [errors, setErrors] = useState<Partial<PersonalInfo>>({});

  const handleInputChange = (field: keyof PersonalInfo, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PersonalInfo> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.province) newErrors.province = 'Province is required';
    if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required';
    if (!formData.monthlyIncome) newErrors.monthlyIncome = 'Monthly income is required';
    if (!formData.sourceOfIncome) newErrors.sourceOfIncome = 'Source of income is required';
    if (!formData.nextOfKinName.trim()) newErrors.nextOfKinName = 'Next of kin name is required';
    if (!formData.nextOfKinPhone.trim()) newErrors.nextOfKinPhone = 'Next of kin phone is required';
    if (!formData.nextOfKinRelationship) newErrors.nextOfKinRelationship = 'Relationship is required';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions' as any;
    if (!formData.privacyAccepted) newErrors.privacyAccepted = 'You must accept the privacy policy' as any;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[+]?[\d\s-()]+$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onComplete(formData);
    }
  };

  const provinces = [
    'Kigali City',
    'Eastern Province',
    'Northern Province',
    'Southern Province',
    'Western Province'
  ];

  const incomeRanges = [
    'Below 50,000 RWF',
    '50,001 - 100,000 RWF',
    '100,001 - 200,000 RWF',
    '200,001 - 500,000 RWF',
    'Above 500,000 RWF'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={errors.firstName ? 'border-red-500' : ''}
            />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={errors.lastName ? 'border-red-500' : ''}
            />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="middleName">Middle Name</Label>
            <Input
              id="middleName"
              value={formData.middleName}
              onChange={(e) => handleInputChange('middleName', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className={errors.dateOfBirth ? 'border-red-500' : ''}
            />
            {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth}</p>}
          </div>

          <div className="space-y-2">
            <Label>Gender *</Label>
            <RadioGroup
              value={formData.gender}
              onValueChange={(value) => handleInputChange('gender', value)}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
            {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nationality">Nationality</Label>
            <Input
              id="nationality"
              value={formData.nationality}
              onChange={(e) => handleInputChange('nationality', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number *</Label>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="+250 XXX XXX XXX"
              className={errors.phoneNumber ? 'border-red-500' : ''}
            />
            {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Physical Address *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className={errors.address ? 'border-red-500' : ''}
              rows={3}
            />
            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City/District *</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className={errors.city ? 'border-red-500' : ''}
            />
            {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="province">Province *</Label>
            <Select value={formData.province} onValueChange={(value) => handleInputChange('province', value)}>
              <SelectTrigger className={errors.province ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.province && <p className="text-sm text-red-500">{errors.province}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Employment & Financial Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Employment & Financial Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="occupation">Occupation *</Label>
            <Input
              id="occupation"
              value={formData.occupation}
              onChange={(e) => handleInputChange('occupation', e.target.value)}
              className={errors.occupation ? 'border-red-500' : ''}
            />
            {errors.occupation && <p className="text-sm text-red-500">{errors.occupation}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="employer">Employer/Business Name</Label>
            <Input
              id="employer"
              value={formData.employer}
              onChange={(e) => handleInputChange('employer', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyIncome">Monthly Income Range *</Label>
            <Select value={formData.monthlyIncome} onValueChange={(value) => handleInputChange('monthlyIncome', value)}>
              <SelectTrigger className={errors.monthlyIncome ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select income range" />
              </SelectTrigger>
              <SelectContent>
                {incomeRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.monthlyIncome && <p className="text-sm text-red-500">{errors.monthlyIncome}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sourceOfIncome">Primary Source of Income *</Label>
            <Select value={formData.sourceOfIncome} onValueChange={(value) => handleInputChange('sourceOfIncome', value)}>
              <SelectTrigger className={errors.sourceOfIncome ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employment">Employment/Salary</SelectItem>
                <SelectItem value="business">Business/Self-employed</SelectItem>
                <SelectItem value="farming">Farming/Agriculture</SelectItem>
                <SelectItem value="investment">Investment Income</SelectItem>
                <SelectItem value="pension">Pension/Retirement</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.sourceOfIncome && <p className="text-sm text-red-500">{errors.sourceOfIncome}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Emergency Contact (Next of Kin)
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nextOfKinName">Full Name *</Label>
            <Input
              id="nextOfKinName"
              value={formData.nextOfKinName}
              onChange={(e) => handleInputChange('nextOfKinName', e.target.value)}
              className={errors.nextOfKinName ? 'border-red-500' : ''}
            />
            {errors.nextOfKinName && <p className="text-sm text-red-500">{errors.nextOfKinName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nextOfKinPhone">Phone Number *</Label>
            <Input
              id="nextOfKinPhone"
              value={formData.nextOfKinPhone}
              onChange={(e) => handleInputChange('nextOfKinPhone', e.target.value)}
              className={errors.nextOfKinPhone ? 'border-red-500' : ''}
            />
            {errors.nextOfKinPhone && <p className="text-sm text-red-500">{errors.nextOfKinPhone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nextOfKinRelationship">Relationship *</Label>
            <Select value={formData.nextOfKinRelationship} onValueChange={(value) => handleInputChange('nextOfKinRelationship', value)}>
              <SelectTrigger className={errors.nextOfKinRelationship ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spouse">Spouse</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="child">Child</SelectItem>
                <SelectItem value="sibling">Sibling</SelectItem>
                <SelectItem value="other-relative">Other Relative</SelectItem>
                <SelectItem value="friend">Friend</SelectItem>
              </SelectContent>
            </Select>
            {errors.nextOfKinRelationship && <p className="text-sm text-red-500">{errors.nextOfKinRelationship}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={formData.termsAccepted}
              onCheckedChange={(checked) => handleInputChange('termsAccepted', checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm leading-5">
              I accept the <Button variant="link" className="p-0 h-auto text-blue-600 underline">terms and conditions</Button> of the savings account *
            </Label>
          </div>
          {errors.termsAccepted && <p className="text-sm text-red-500 ml-6">{errors.termsAccepted}</p>}

          <div className="flex items-start space-x-2">
            <Checkbox
              id="privacy"
              checked={formData.privacyAccepted}
              onCheckedChange={(checked) => handleInputChange('privacyAccepted', checked as boolean)}
            />
            <Label htmlFor="privacy" className="text-sm leading-5">
              I consent to the processing of my personal data as described in the <Button variant="link" className="p-0 h-auto text-blue-600 underline">privacy policy</Button> *
            </Label>
          </div>
          {errors.privacyAccepted && <p className="text-sm text-red-500 ml-6">{errors.privacyAccepted}</p>}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" size="lg" className="px-8">
          Continue to KYC Verification
        </Button>
      </div>
    </form>
  );
};

export default AccountRegistrationForm;
