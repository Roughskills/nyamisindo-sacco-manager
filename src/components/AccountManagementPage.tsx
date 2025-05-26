
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, CreditCard, Shield, FileText, Camera, CheckCircle2, AlertCircle, Clock } from "lucide-react";
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

const AccountManagementPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [registrationData, setRegistrationData] = useState({
    personalInfo: {},
    kycData: {},
    idVerification: {},
    livenessResult: null,
    photos: {}
  });

  const steps: RegistrationStep[] = [
    {
      id: 'personal-info',
      title: 'Personal Information',
      description: 'Basic account holder information',
      status: 'completed',
      component: AccountRegistrationForm
    },
    {
      id: 'kyc',
      title: 'KYC Verification',
      description: 'Know Your Customer verification',
      status: 'in-progress',
      component: KYCVerification
    },
    {
      id: 'id-verification',
      title: 'ID Verification',
      description: 'Government ID document verification',
      status: 'pending',
      component: IDVerification
    },
    {
      id: 'liveness',
      title: 'Liveness Detection',
      description: 'Biometric liveness verification',
      status: 'pending',
      component: LivenessDetection
    },
    {
      id: 'photo-upload',
      title: 'Photo Upload',
      description: 'Profile and supporting documents',
      status: 'pending',
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

  const handleStepComplete = (stepData: any) => {
    const currentStep = steps[activeStep];
    setRegistrationData(prev => ({
      ...prev,
      [currentStep.id.replace('-', '')]: stepData
    }));
    
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const CurrentStepComponent = steps[activeStep]?.component;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Account Management</h1>
          <p className="text-gray-600 mt-2">Manage member savings accounts and registration process</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          <Shield className="h-4 w-4 mr-2" />
          Secure Registration
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
                        : index < activeStep
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
          <Card>
            <CardHeader>
              <CardTitle>Existing Member Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No existing accounts to display</p>
                <p className="text-sm">Approved registrations will appear here</p>
              </div>
            </CardContent>
          </Card>
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
