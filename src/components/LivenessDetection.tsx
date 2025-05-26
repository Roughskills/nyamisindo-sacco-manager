
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Camera, Eye, RotateCcw, Smile, AlertCircle, CheckCircle2, Play, Square } from "lucide-react";

interface LivenessDetectionProps {
  onComplete: (data: any) => void;
  data?: any;
}

interface LivenessChallenge {
  id: string;
  instruction: string;
  icon: React.ComponentType<any>;
  completed: boolean;
}

const LivenessDetection = ({ onComplete, data }: LivenessDetectionProps) => {
  const [isActive, setIsActive] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'pending' | 'success' | 'failed'>('pending');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const challenges: LivenessChallenge[] = [
    {
      id: 'look-straight',
      instruction: 'Look straight at the camera',
      icon: Eye,
      completed: false
    },
    {
      id: 'turn-left',
      instruction: 'Turn your head slowly to the left',
      icon: RotateCcw,
      completed: false
    },
    {
      id: 'turn-right',
      instruction: 'Turn your head slowly to the right',
      icon: RotateCcw,
      completed: false
    },
    {
      id: 'smile',
      instruction: 'Smile naturally',
      icon: Smile,
      completed: false
    },
    {
      id: 'blink',
      instruction: 'Blink your eyes twice',
      icon: Eye,
      completed: false
    }
  ];

  const [challengeStates, setChallengeStates] = useState(challenges);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      setStream(mediaStream);
      setIsActive(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Camera access is required for liveness detection. Please enable camera permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsActive(false);
  };

  const simulateLivenessDetection = async () => {
    setIsProcessing(true);
    
    for (let i = 0; i < challengeStates.length; i++) {
      setCurrentChallenge(i);
      
      // Simulate challenge detection time
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
      
      setChallengeStates(prev => 
        prev.map((challenge, index) => 
          index === i ? { ...challenge, completed: true } : challenge
        )
      );
      
      setProgress(((i + 1) / challengeStates.length) * 100);
    }

    // Simulate final verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 95% success rate simulation
    const success = Math.random() > 0.05;
    setVerificationResult(success ? 'success' : 'failed');
    setIsProcessing(false);
  };

  const handleComplete = () => {
    stopCamera();
    onComplete({
      livenessResult: verificationResult,
      challenges: challengeStates,
      timestamp: new Date().toISOString()
    });
  };

  const resetTest = () => {
    setChallengeStates(challenges);
    setCurrentChallenge(0);
    setProgress(0);
    setVerificationResult('pending');
    setIsProcessing(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const currentChallengeData = challengeStates[currentChallenge];
  const allChallengesCompleted = challengeStates.every(c => c.completed);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Camera className="h-5 w-5" />
            Biometric Liveness Detection
          </CardTitle>
          <p className="text-sm text-purple-700">
            Follow the on-screen instructions to verify you are a real person
          </p>
        </CardHeader>
      </Card>

      {/* Camera and Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Camera Feed</span>
              <Badge variant={isActive ? 'default' : 'secondary'}>
                {isActive ? 'Active' : 'Inactive'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover mirror"
                style={{ transform: 'scaleX(-1)' }}
              />
              
              {/* Overlay for face detection frame */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-80 border-2 border-white rounded-lg opacity-50" />
              </div>

              {/* Status overlay */}
              <div className="absolute top-4 left-4 right-4">
                {isProcessing && currentChallengeData && (
                  <div className="bg-black bg-opacity-75 text-white p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center mb-2">
                      <currentChallengeData.icon className="h-5 w-5 mr-2" />
                      <span className="font-medium">{currentChallengeData.instruction}</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                  </div>
                )}
              </div>

              {/* Result overlay */}
              {verificationResult !== 'pending' && (
                <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                  <div className="text-center text-white">
                    {verificationResult === 'success' ? (
                      <>
                        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Liveness Verified!</h3>
                        <p>You have been successfully verified as a real person</p>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Verification Failed</h3>
                        <p>Please try again with better lighting and positioning</p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center mt-4 space-x-4">
              {!isActive ? (
                <Button onClick={startCamera} className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Start Camera
                </Button>
              ) : (
                <>
                  <Button
                    onClick={stopCamera}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Square className="h-4 w-4" />
                    Stop Camera
                  </Button>
                  {!isProcessing && verificationResult === 'pending' && (
                    <Button
                      onClick={simulateLivenessDetection}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Start Liveness Test
                    </Button>
                  )}
                  {verificationResult === 'failed' && (
                    <Button
                      onClick={resetTest}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Try Again
                    </Button>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Challenge Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Liveness Challenges</CardTitle>
            <p className="text-sm text-gray-600">
              Complete all challenges to verify your identity
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {challengeStates.map((challenge, index) => {
                const Icon = challenge.icon;
                const isCurrent = index === currentChallenge && isProcessing;
                const isCompleted = challenge.completed;

                return (
                  <div
                    key={challenge.id}
                    className={`flex items-center p-3 rounded-lg border transition-all ${
                      isCurrent
                        ? 'border-blue-500 bg-blue-50'
                        : isCompleted
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className={`p-2 rounded-full mr-3 ${
                      isCompleted
                        ? 'bg-green-100 text-green-600'
                        : isCurrent
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{challenge.instruction}</p>
                      {isCurrent && (
                        <p className="text-sm text-blue-600">Follow this instruction now</p>
                      )}
                    </div>
                    <Badge
                      variant={isCompleted ? 'default' : 'secondary'}
                      className={isCompleted ? 'bg-green-100 text-green-800' : ''}
                    >
                      {isCompleted ? 'Complete' : 'Pending'}
                    </Badge>
                  </div>
                );
              })}
            </div>

            {isProcessing && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Important Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-green-700 mb-2">✓ For Best Results</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ensure good lighting on your face</li>
                <li>• Position your face in the center frame</li>
                <li>• Remove glasses or hats if possible</li>
                <li>• Follow instructions slowly and clearly</li>
                <li>• Keep your device steady</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-700 mb-2">✗ Avoid</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Moving too quickly</li>
                <li>• Poor lighting conditions</li>
                <li>• Using photos or videos</li>
                <li>• Having multiple faces in frame</li>
                <li>• Blocking your face</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <canvas ref={canvasRef} className="hidden" />

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline">
          Back to ID Verification
        </Button>
        <Button
          onClick={handleComplete}
          disabled={verificationResult !== 'success'}
          className="px-8"
        >
          Continue to Photo Upload
        </Button>
      </div>
    </div>
  );
};

export default LivenessDetection;
