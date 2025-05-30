import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle2, FileText, CreditCard } from "lucide-react";

interface KYCData {
  idType: string;
  idNumber: string;
  issueDate: string;
  expiryDate: string;
  issuingCountry: string;
  taxIdNumber: string;
  hasTaxObligations: boolean;
  politicallyExposed: boolean;
  sanctionsCheck: boolean;
  bankingHistory: string;
  previousAccounts: string;
  riskAssessment: string;
  amlScreening: boolean;
}

interface KYCVerificationProps {
  onComplete: (data: KYCData) => void;
  data?: any;
}

const KYCVerification = ({ onComplete, data }: KYCVerificationProps) => {
  const [formData, setFormData] = useState<KYCData>({
    idType: '',
    idNumber: '',
    issueDate: '',
    expiryDate: '',
    issuingCountry: 'Rwanda',
    taxIdNumber: '',
    hasTaxObligations: false,
    politicallyExposed: false,
    sanctionsCheck: false,
    bankingHistory: '',
    previousAccounts: '',
    riskAssessment: '',
    amlScreening: false,
    ...data?.kycData
  });

  const [verificationStatus, setVerificationStatus] = useState({
    identityVerified: false,
    documentsValid: false,
    amlCleared: false,
    riskAssessed: false
  });

  const [isVerifying, setIsVerifying] = useState(false);
  const [errors, setErrors] = useState<Partial<KYCData>>({});

  const handleInputChange = (field: keyof KYCData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<KYCData> = {};

    if (!formData.idType) newErrors.idType = 'ID type is required';
    if (!formData.idNumber.trim()) newErrors.idNumber = 'ID number is required';
    if (!formData.issueDate) newErrors.issueDate = 'Issue date is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.bankingHistory) newErrors.bankingHistory = 'Banking history is required';
    if (!formData.riskAssessment) newErrors.riskAssessment = 'Risk assessment is required';
    if (!formData.amlScreening) newErrors.amlScreening = 'AML screening confirmation is required' as any;

    // Date validations
    if (formData.issueDate && formData.expiryDate) {
      const issueDate = new Date(formData.issueDate);
      const expiryDate = new Date(formData.expiryDate);
      const today = new Date();

      if (issueDate > today) {
        newErrors.issueDate = 'Issue date cannot be in the future';
      }
      
      if (expiryDate <= today) {
        newErrors.expiryDate = 'Document has expired';
      }
      
      if (expiryDate <= issueDate) {
        newErrors.expiryDate = 'Expiry date must be after issue date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const simulateVerification = async () => {
    setIsVerifying(true);
    
    // Simulate API calls for verification
    const steps = [
      { key: 'identityVerified', delay: 1000 },
      { key: 'documentsValid', delay: 1500 },
      { key: 'amlCleared', delay: 2000 },
      { key: 'riskAssessed', delay: 1000 }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, step.delay));
      setVerificationStatus(prev => ({ 
        ...prev, 
        [step.key]: true 
      }));
    }

    setIsVerifying(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await simulateVerification();
      onComplete(formData);
    }
  };

  const idTypes = [
    { value: 'national-id', label: 'National ID Card' },
    { value: 'passport', label: 'Passport' },
    { value: 'driving-license', label: 'Driving License' },
    { value: 'refugee-id', label: 'Refugee ID' }
  ];

  const allVerified = Object.values(verificationStatus).every(status => status === true);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Verification Status */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Shield className="h-5 w-5" />
            KYC Verification Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: 'identityVerified', label: 'Identity', icon: FileText },
              { key: 'documentsValid', label: 'Documents', icon: CreditCard },
              { key: 'amlCleared', label: 'AML Check', icon: Shield },
              { key: 'riskAssessed', label: 'Risk Assessment', icon: AlertTriangle }
            ].map(({ key, label, icon: Icon }) => (
              <div key={key} className="flex items-center space-x-2">
                <Icon className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">{label}</span>
                {verificationStatus[key as keyof typeof verificationStatus] ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Identity Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Identity Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="idType">ID Document Type *</Label>
            <Select value={formData.idType} onValueChange={(value) => handleInputChange('idType', value)}>
              <SelectTrigger className={errors.idType ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select ID type" />
              </SelectTrigger>
              <SelectContent>
                {idTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.idType && <p className="text-sm text-red-500">{errors.idType}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="idNumber">ID Number *</Label>
            <Input
              id="idNumber"
              value={formData.idNumber}
              onChange={(e) => handleInputChange('idNumber', e.target.value)}
              className={errors.idNumber ? 'border-red-500' : ''}
              placeholder="Enter your ID number"
            />
            {errors.idNumber && <p className="text-sm text-red-500">{errors.idNumber}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="issueDate">Issue Date *</Label>
            <Input
              id="issueDate"
              type="date"
              value={formData.issueDate}
              onChange={(e) => handleInputChange('issueDate', e.target.value)}
              className={errors.issueDate ? 'border-red-500' : ''}
            />
            {errors.issueDate && <p className="text-sm text-red-500">{errors.issueDate}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date *</Label>
            <Input
              id="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              className={errors.expiryDate ? 'border-red-500' : ''}
            />
            {errors.expiryDate && <p className="text-sm text-red-500">{errors.expiryDate}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="issuingCountry">Issuing Country</Label>
            <Input
              id="issuingCountry"
              value={formData.issuingCountry}
              onChange={(e) => handleInputChange('issuingCountry', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxIdNumber">Tax ID Number (if applicable)</Label>
            <Input
              id="taxIdNumber"
              value={formData.taxIdNumber}
              onChange={(e) => handleInputChange('taxIdNumber', e.target.value)}
              placeholder="Optional"
            />
          </div>
        </CardContent>
      </Card>

      {/* Compliance Checks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Compliance & Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="taxObligations"
                checked={formData.hasTaxObligations}
                onCheckedChange={(checked) => handleInputChange('hasTaxObligations', checked as boolean)}
              />
              <Label htmlFor="taxObligations" className="text-sm leading-5">
                Do you have tax obligations in any other country?
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="politicallyExposed"
                checked={formData.politicallyExposed}
                onCheckedChange={(checked) => handleInputChange('politicallyExposed', checked as boolean)}
              />
              <Label htmlFor="politicallyExposed" className="text-sm leading-5">
                Are you a politically exposed person (PEP) or related to one?
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="sanctionsCheck"
                checked={formData.sanctionsCheck}
                onCheckedChange={(checked) => handleInputChange('sanctionsCheck', checked as boolean)}
              />
              <Label htmlFor="sanctionsCheck" className="text-sm leading-5">
                I confirm that I am not on any sanctions list
              </Label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bankingHistory">Banking History *</Label>
              <Select value={formData.bankingHistory} onValueChange={(value) => handleInputChange('bankingHistory', value)}>
                <SelectTrigger className={errors.bankingHistory ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select banking history" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first-account">This is my first bank account</SelectItem>
                  <SelectItem value="existing-accounts">I have other bank accounts</SelectItem>
                  <SelectItem value="previous-accounts">I had accounts before but closed them</SelectItem>
                </SelectContent>
              </Select>
              {errors.bankingHistory && <p className="text-sm text-red-500">{errors.bankingHistory}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="riskAssessment">Risk Profile Assessment *</Label>
              <RadioGroup
                value={formData.riskAssessment}
                onValueChange={(value) => handleInputChange('riskAssessment', value)}
                className="grid grid-cols-3 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low" className="text-sm">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Low Risk
                    </Badge>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium" className="text-sm">
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Medium Risk
                    </Badge>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high" className="text-sm">
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      High Risk
                    </Badge>
                  </Label>
                </div>
              </RadioGroup>
              {errors.riskAssessment && <p className="text-sm text-red-500">{errors.riskAssessment}</p>}
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="amlScreening"
              checked={formData.amlScreening}
              onCheckedChange={(checked) => handleInputChange('amlScreening', checked as boolean)}
            />
            <Label htmlFor="amlScreening" className="text-sm leading-5">
              I consent to AML (Anti-Money Laundering) screening and ongoing monitoring *
            </Label>
          </div>
          {errors.amlScreening && <p className="text-sm text-red-500 ml-6">{errors.amlScreening}</p>}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button type="button" variant="outline">
          Back to Personal Info
        </Button>
        <Button 
          type="submit" 
          disabled={isVerifying || !allVerified}
          className="px-8"
        >
          {isVerifying ? 'Verifying...' : 'Continue to ID Verification'}
        </Button>
      </div>
    </form>
  );
};

export default KYCVerification;
