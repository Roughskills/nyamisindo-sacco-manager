
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, Camera, FileText, User, MapPin, X, CheckCircle2, Image as ImageIcon } from "lucide-react";

interface PhotoUploadProps {
  onComplete: (data: any) => void;
  data?: any;
}

interface UploadCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  required: boolean;
  maxFiles: number;
  files: File[];
}

const PhotoUpload = ({ onComplete, data }: PhotoUploadProps) => {
  const [categories, setCategories] = useState<UploadCategory[]>([
    {
      id: 'profile',
      title: 'Profile Photo',
      description: 'Recent passport-style photo for your account',
      icon: User,
      required: true,
      maxFiles: 1,
      files: []
    },
    {
      id: 'residence',
      title: 'Proof of Residence',
      description: 'Utility bill, bank statement, or lease agreement',
      icon: MapPin,
      required: true,
      maxFiles: 2,
      files: []
    },
    {
      id: 'income',
      title: 'Proof of Income',
      description: 'Salary slip, tax return, or business registration',
      icon: FileText,
      required: true,
      maxFiles: 3,
      files: []
    },
    {
      id: 'additional',
      title: 'Additional Documents',
      description: 'Any other supporting documents',
      icon: ImageIcon,
      required: false,
      maxFiles: 5,
      files: []
    }
  ]);

  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleFileUpload = (categoryId: string, newFiles: FileList) => {
    setCategories(prev => prev.map(category => {
      if (category.id === categoryId) {
        const existingFiles = category.files;
        const filesToAdd = Array.from(newFiles);
        const totalFiles = existingFiles.length + filesToAdd.length;
        
        if (totalFiles <= category.maxFiles) {
          return { ...category, files: [...existingFiles, ...filesToAdd] };
        } else {
          const availableSlots = category.maxFiles - existingFiles.length;
          return { 
            ...category, 
            files: [...existingFiles, ...filesToAdd.slice(0, availableSlots)] 
          };
        }
      }
      return category;
    }));
  };

  const removeFile = (categoryId: string, fileIndex: number) => {
    setCategories(prev => prev.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          files: category.files.filter((_, index) => index !== fileIndex)
        };
      }
      return category;
    }));
  };

  const getFileTypeIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="h-4 w-4" />;
    } else if (file.type === 'application/pdf') {
      return <FileText className="h-4 w-4" />;
    } else {
      return <FileText className="h-4 w-4" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateUploads = () => {
    const requiredCategories = categories.filter(cat => cat.required);
    return requiredCategories.every(cat => cat.files.length > 0);
  };

  const handleSubmit = async () => {
    if (!validateUploads()) {
      alert('Please upload all required documents');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const uploadData = {
      categories: categories.map(cat => ({
        id: cat.id,
        title: cat.title,
        files: cat.files.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified
        }))
      })),
      notes,
      timestamp: new Date().toISOString()
    };

    onComplete(uploadData);
    setIsSubmitting(false);
  };

  const totalFiles = categories.reduce((sum, cat) => sum + cat.files.length, 0);
  const requiredFilesUploaded = categories
    .filter(cat => cat.required)
    .every(cat => cat.files.length > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Upload className="h-5 w-5" />
            Document Upload
          </CardTitle>
          <div className="flex items-center justify-between">
            <p className="text-sm text-green-700">
              Upload required documents to complete your account registration
            </p>
            <Badge variant="outline" className="bg-white">
              {totalFiles} files uploaded
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Upload Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          const hasFiles = category.files.length > 0;
          const isComplete = category.required ? hasFiles : true;

          return (
            <Card
              key={category.id}
              className={`transition-all ${
                isComplete
                  ? 'border-green-200 bg-green-50'
                  : category.required
                  ? 'border-red-200 bg-red-50'
                  : 'border-gray-200'
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      isComplete
                        ? 'bg-green-100 text-green-600'
                        : category.required
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {category.title}
                        {category.required && (
                          <Badge variant="outline" className="text-xs bg-red-100 text-red-700">
                            Required
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  {isComplete && (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Upload Area */}
                <div
                  className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
                  onClick={() => fileInputRefs.current[category.id]?.click()}
                >
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-xs text-gray-500">
                    Max {category.maxFiles} file(s) • PNG, JPG, PDF up to 10MB each
                  </p>
                </div>

                {/* File List */}
                {category.files.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Uploaded Files ({category.files.length}/{category.maxFiles})
                    </Label>
                    {category.files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border"
                      >
                        <div className="flex items-center space-x-3">
                          {getFileTypeIcon(file)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(category.id, index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRefs.current[category.id]?.click()}
                    disabled={category.files.length >= category.maxFiles}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Files
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // In a real app, this would open camera
                      fileInputRefs.current[category.id]?.click();
                    }}
                    disabled={category.files.length >= category.maxFiles}
                    className="flex items-center gap-2"
                  >
                    <Camera className="h-4 w-4" />
                    Take Photo
                  </Button>
                </div>

                <input
                  ref={el => fileInputRefs.current[category.id] = el}
                  type="file"
                  multiple={category.maxFiles > 1}
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) {
                      handleFileUpload(category.id, e.target.files);
                    }
                  }}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Notes (Optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any additional information or context about your documents..."
            rows={4}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Upload Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Document Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-green-700 mb-2">✓ Accepted Formats</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• JPEG, PNG for photos</li>
                <li>• PDF for documents</li>
                <li>• High resolution images</li>
                <li>• Clear and readable text</li>
                <li>• Original documents preferred</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-2">📋 Requirements</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Documents must be current</li>
                <li>• All text must be visible</li>
                <li>• No handwritten alterations</li>
                <li>• Official letterhead for bills</li>
                <li>• Recent dates (within 3 months)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-amber-700 mb-2">⚠️ File Limits</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Maximum 10MB per file</li>
                <li>• Up to 11 files total</li>
                <li>• Virus scan on all uploads</li>
                <li>• Secure encrypted storage</li>
                <li>• 30-day processing period</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline">
          Back to Liveness Test
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!requiredFilesUploaded || isSubmitting}
          className="px-8"
        >
          {isSubmitting ? 'Uploading...' : 'Complete Registration'}
        </Button>
      </div>
    </div>
  );
};

export default PhotoUpload;
