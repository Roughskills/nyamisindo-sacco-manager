
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

  const getStepStatus = (stepId: string): 'pending' | 'completed' => {
    return formData[stepId] ? 'completed' : 'pending';
  };

  const steps = [
    {
      id: 'idVerification',
      title: 'ID Verification',
      description: 'Scan and verify national ID document',
      component: IDVerification,
      status: getStepStatus('idVerification')
    },
    {
      id: 'livenessDetection',
      title: 'Liveness Detection',
      description: 'Biometric verification using facial recognition',
      component: LivenessDetection,
      status: getStepStatus('livenessDetection')
    },
    {
      id: 'farmLocation',
      title: 'Farm Locator',
      description: 'Mark exact farm location with GPS coordinates',
      component: FarmLocator,
      status: getStepStatus('farmLocation')
    },
    {
      id: 'kycVerification',
      title: 'KYC Verification',
      description: 'Complete Know Your Customer verification',
      component: KYCVerification,
      status: getStepStatus('kycVerification')
    },
    {
      id: 'photoUpload',
      title: 'Photo Upload',
      description: 'Upload profile and additional photos',
      component: PhotoUpload,
      status: getStepStatus('photoUpload')
    }
  ];

  const handleStepComplete = (stepId: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [stepId]: data
    }));
    
    toast({
      title: "Step Completed!",
      description: `${steps.find(s => s.id === stepId)?.title} has been completed successfully.`,
    });
    
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
  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const progress = (completedSteps / steps.length) * 100;

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
              <span className="text-sm text-gray-600">{Math.round(progress)}% ({completedSteps}/{steps.length} completed)</span>
            </div>
            <Progress value={progress} className="w-full" />

            <ul className="space-y-3">
              {steps.map((step, index) => (
                <li key={step.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50">
                  <div className="flex items-center">
                    {step.status === 'completed' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                    ) : index === currentStep ? (
                      <Clock className="h-5 w-5 text-blue-500 mr-3" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400 mr-3" />
                    )}
                    <div>
                      <p className={`font-medium ${step.status === 'completed' ? 'text-green-700' : index === currentStep ? 'text-blue-700' : 'text-gray-700'}`}>
                        {step.title}
                      </p>
                      <p className="text-sm text-gray-500">{step.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {step.status === 'completed' && (
                      <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                        Completed
                      </Badge>
                    )}
                    {index === currentStep && step.status !== 'completed' && (
                      <Badge variant="default" className="bg-blue-100 text-blue-800 border-blue-200">
                        Current
                      </Badge>
                    )}
                    {index > currentStep && step.status !== 'completed' && (
                      <Badge variant="outline" className="text-gray-500">
                        Pending
                      </Badge>
                    )}
                  </div>
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
            {steps[currentStep].status === 'completed' && (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CurrentComponent 
            onComplete={(data: any) => handleStepComplete(steps[currentStep].id, data)} 
            data={currentStepData} 
          />
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
            onClick={() => handleStepComplete(steps[currentStep].id, { skipped: true })}
            variant="outline"
            className="px-8"
          >
            Skip for Now
          </Button>
        ) : (
          <Button 
            className="px-8"
            disabled={completedSteps < steps.length}
          >
            Complete Registration
          </Button>
        )}
      </div>
    </div>
  );
};

export default AccountRegistrationForm;
