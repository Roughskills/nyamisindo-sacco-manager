import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Camera, FileText, CheckCircle2, AlertCircle, Scan, Eye, Shield } from "lucide-react";

interface IDVerificationProps {
  onComplete: (data: any) => void;
  data?: any;
}

const IDVerification = ({ onComplete, data }: IDVerificationProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<{
    frontImage: File | null;
    backImage: File | null;
    selfieWithID: File | null;
  }>({
    frontImage: null,
    backImage: null,
    selfieWithID: null
  });

  const [verificationResults, setVerificationResults] = useState({
    documentAuthenticity: null as boolean | null,
    faceMatch: null as boolean | null,
    dataExtraction: null as boolean | null,
    qualityCheck: null as boolean | null
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const fileInputRefs = {
    front: useRef<HTMLInputElement>(null),
    back: useRef<HTMLInputElement>(null),
    selfie: useRef<HTMLInputElement>(null)
  };

  const verificationSteps = [
    {
      title: 'Upload ID Front',
      description: 'Take a clear photo of the front of your ID document',
      icon: FileText,
      field: 'frontImage' as keyof typeof uploadedFiles
    },
    {
      title: 'Upload ID Back',
      description: 'Take a clear photo of the back of your ID document',
      icon: FileText,
      field: 'backImage' as keyof typeof uploadedFiles
    },
    {
      title: 'Selfie with ID',
      description: 'Take a selfie holding your ID document next to your face',
      icon: Camera,
      field: 'selfieWithID' as keyof typeof uploadedFiles
    }
  ];

  const handleFileUpload = (field: keyof typeof uploadedFiles, file: File) => {
    setUploadedFiles(prev => ({
      ...prev,
      [field]: file
    }));

    // Auto-advance to next step
    if (currentStep < verificationSteps.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 500);
    }
  };

  const simulateVerification = async () => {
    setIsProcessing(true);

    const steps = [
      { key: 'qualityCheck', delay: 1000 },
      { key: 'documentAuthenticity', delay: 1500 },
      { key: 'dataExtraction', delay: 1000 },
      { key: 'faceMatch', delay: 2000 }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, step.delay));
      setVerificationResults(prev => ({
        ...prev,
        [step.key]: Math.random() > 0.1 // 90% success rate
      }));
    }

    setIsProcessing(false);
  };

  const handleSubmit = async () => {
    if (Object.values(uploadedFiles).every(file => file !== null)) {
      await simulateVerification();
      onComplete({
        files: uploadedFiles,
        verificationResults
      });
    }
  };

  const allFilesUploaded = Object.values(uploadedFiles).every(file => file !== null);
  const allVerified = Object.values(verificationResults).every(result => result === true);

  return (
    <div className="space-y-6">
      {/* Verification Progress */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Scan className="h-5 w-5" />
            ID Document Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: 'qualityCheck', label: 'Image Quality', icon: Eye },
              { key: 'documentAuthenticity', label: 'Document Auth', icon: Shield },
              { key: 'dataExtraction', label: 'Data Extract', icon: FileText },
              { key: 'faceMatch', label: 'Face Match', icon: Camera }
            ].map(({ key, label, icon: Icon }) => (
              <div key={key} className="flex items-center space-x-2">
                <Icon className="h-4 w-4 text-gray-500" />
                <span className="text-xs font-medium">{label}</span>
                {verificationResults[key as keyof typeof verificationResults] === true ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : verificationResults[key as keyof typeof verificationResults] === false ? (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upload Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {verificationSteps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = uploadedFiles[step.field] !== null;
          const file = uploadedFiles[step.field];

          return (
            <Card
              key={step.field}
              className={`cursor-pointer transition-all ${
                isActive
                  ? 'border-blue-500 bg-blue-50'
                  : isCompleted
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200'
              }`}
              onClick={() => setCurrentStep(index)}
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  <div className={`p-3 rounded-full ${
                    isCompleted
                      ? 'bg-green-100 text-green-600'
                      : isActive
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      <Icon className="h-6 w-6" />
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
                <p className="text-sm text-gray-600">{step.description}</p>
              </CardHeader>
              <CardContent>
                {file ? (
                  <div className="space-y-3">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 truncate">{file.name}</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Uploaded
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => fileInputRefs[step.field.includes('front') ? 'front' : step.field.includes('back') ? 'back' : 'selfie'].current?.click()}
                    >
                      Replace Photo
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors"
                      onClick={() => fileInputRefs[step.field.includes('front') ? 'front' : step.field.includes('back') ? 'back' : 'selfie'].current?.click()}
                    >
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload or drag & drop</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRefs[step.field.includes('front') ? 'front' : step.field.includes('back') ? 'back' : 'selfie'].current?.click()}
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Upload
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // In a real app, this would open camera
                          fileInputRefs[step.field.includes('front') ? 'front' : step.field.includes('back') ? 'back' : 'selfie'].current?.click();
                        }}
                      >
                        <Camera className="h-4 w-4 mr-1" />
                        Camera
                      </Button>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRefs[step.field.includes('front') ? 'front' : step.field.includes('back') ? 'back' : 'selfie']}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileUpload(step.field, file);
                    }
                  }}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Verification Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Photo Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-green-700">✓ Do This</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ensure good lighting</li>
                <li>• Keep document flat</li>
                <li>• Include all edges</li>
                <li>• Use high resolution</li>
                <li>• Face the camera directly</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-red-700">✗ Avoid This</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Blurry or dark photos</li>
                <li>• Glare or reflections</li>
                <li>• Covering any text</li>
                <li>• Damaged documents</li>
                <li>• Screenshots or copies</li>
                <li>• Screenshots or copies</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-700">📋 Requirements</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Original documents only</li>
                <li>• Valid (not expired)</li>
                <li>• Government-issued ID</li>
                <li>• Readable text</li>
                <li>• Your face clearly visible</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline">
          Back to KYC
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!allFilesUploaded || isProcessing}
          className="px-8"
        >
          {isProcessing ? 'Processing...' : allVerified ? 'Continue to Liveness Test' : 'Verify Documents'}
        </Button>
      </div>
    </div>
  );
};

export default IDVerification;
