import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Clock, User, Camera, MapPin, FileCheck, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import step components
import IDVerification from './IDVerification';
import LivenessDetection from './LivenessDetection';
import FarmLocator from './FarmLocator';
import KYCVerification from './KYCVerification';
import PhotoUpload from './PhotoUpload';

interface RegistrationStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
  status: 'pending' | 'completed';
}

const AccountRegistrationForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    idVerification: null,
    livenessDetection: null,
    farmLocation: null,
    kycVerification: null,
    photoUpload: null
  });

  const steps = [
    {
      id: 'id-verification',
      title: 'ID Verification',
      description: 'Scan and verify national ID document',
      component: IDVerification,
      status: formData.idVerification ? 'completed' : 'pending'
    },
    {
      id: 'liveness-detection',
      title: 'Liveness Detection',
      description: 'Biometric verification using facial recognition',
      component: LivenessDetection,
      status: formData.livenessDetection ? 'completed' : 'pending'
    },
    {
      id: 'farm-locator',
      title: 'Farm Locator',
      description: 'Mark exact farm location with GPS coordinates',
      component: FarmLocator,
      status: formData.farmLocation ? 'completed' : 'pending'
    },
    {
      id: 'kyc-verification',
      title: 'KYC Verification',
      description: 'Complete Know Your Customer verification',
      component: KYCVerification,
      status: formData.kycVerification ? 'completed' : 'pending'
    },
    {
      id: 'photo-upload',
      title: 'Photo Upload',
      description: 'Upload profile and additional photos',
      component: PhotoUpload,
      status: formData.photoUpload ? 'completed' : 'pending'
    }
  ];

  const handleStepComplete = (stepId: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [stepId]: data
    }));
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      toast({
        title: "Registration Complete!",
        description: "You have completed all registration steps.",
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentComponent = steps[currentStep].component;
  const currentStepData = formData[steps[currentStep].id];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <User className="h-5 w-5" />
            Account Registration
          </CardTitle>
          <p className="text-sm text-blue-700">
            Complete all steps to create your account
          </p>
        </CardHeader>
      </Card>

      {/* Progress Tracker */}
      <Card>
        <CardHeader>
          <CardTitle>Account Registration Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />

            <ul className="space-y-2">
              {steps.map((step, index) => (
                <li key={step.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {step.status === 'completed' ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <Circle className="h-4 w-4 text-gray-400 mr-2" />
                    )}
                    <div>
                      <p className="font-medium">{step.title}</p>
                      <p className="text-sm text-gray-500">{step.description}</p>
                    </div>
                  </div>
                  {index < currentStep && (
                    <Badge variant="outline">
                      Completed
                    </Badge>
                  )}
                  {index === currentStep && (
                    <Badge variant="secondary">
                      Current
                    </Badge>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {currentStep === 0 && <FileCheck className="h-5 w-5" />}
            {currentStep === 1 && <Camera className="h-5 w-5" />}
            {currentStep === 2 && <MapPin className="h-5 w-5" />}
            {currentStep === 3 && <FileCheck className="h-5 w-5" />}
            {currentStep === 4 && <Upload className="h-5 w-5" />}
            {steps[currentStep].title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CurrentComponent onComplete={(data: any) => handleStepComplete(steps[currentStep].id, data)} data={currentStepData} />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Back
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button
            onClick={() => handleStepComplete(steps[currentStep].id, null)}
            className="px-8"
          >
            Continue
          </Button>
        ) : (
          <Button className="px-8">
            Complete Registration
          </Button>
        )}
      </div>
    </div>
  );
};

export default AccountRegistrationForm;
