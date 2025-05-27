
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Smartphone, Building2, Calendar, DollarSign, Hash, User, FileText } from "lucide-react";

interface Payment {
  id: string;
  farmerName: string;
  amount: number;
  method: 'airtel' | 'mtn' | 'bank';
  reference: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  description: string;
}

interface PaymentDetailsModalProps {
  payment: Payment | null;
  isOpen: boolean;
  onClose: () => void;
}

const PaymentDetailsModal = ({ payment, isOpen, onClose }: PaymentDetailsModalProps) => {
  if (!payment) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'airtel':
        return <Smartphone className="h-5 w-5 text-red-600" />;
      case 'mtn':
        return <Smartphone className="h-5 w-5 text-yellow-600" />;
      case 'bank':
        return <Building2 className="h-5 w-5 text-blue-600" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  const getMethodName = (method: string) => {
    switch (method) {
      case 'airtel':
        return 'Airtel Money';
      case 'mtn':
        return 'MTN Mobile Money';
      case 'bank':
        return 'Bank Transfer';
      default:
        return 'Unknown';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Payment Details
          </DialogTitle>
          <DialogDescription>
            Complete payment information for transaction {payment.reference}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge className={`${getStatusColor(payment.status)} text-lg px-4 py-2`}>
              {payment.status.toUpperCase()}
            </Badge>
          </div>

          {/* Main Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    Recipient
                  </div>
                  <div className="font-semibold text-lg">{payment.farmerName}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    Amount
                  </div>
                  <div className="font-semibold text-lg text-green-600">
                    {formatCurrency(payment.amount)}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    Date & Time
                  </div>
                  <div className="font-medium">
                    {new Date(payment.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(payment.date).toLocaleTimeString('en-US')}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Hash className="h-4 w-4" />
                    Reference Number
                  </div>
                  <div className="font-medium font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {payment.reference}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="h-4 w-4" />
                  Description
                </div>
                <div className="font-medium">{payment.description}</div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getMethodIcon(payment.method)}
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Method</span>
                  <span className="font-medium">{getMethodName(payment.method)}</span>
                </div>
                
                {payment.method === 'airtel' && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Network</span>
                      <span className="font-medium text-red-600">Airtel Uganda</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Service</span>
                      <span className="font-medium">Airtel Money</span>
                    </div>
                  </>
                )}

                {payment.method === 'mtn' && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Network</span>
                      <span className="font-medium text-yellow-600">MTN Uganda</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Service</span>
                      <span className="font-medium">MTN Mobile Money</span>
                    </div>
                  </>
                )}

                {payment.method === 'bank' && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Transfer Type</span>
                      <span className="font-medium">Bank Transfer</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Processing Time</span>
                      <span className="font-medium">1-3 Business Days</span>
                    </div>
                  </>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Transaction Fee</span>
                  <span className="font-medium">Free</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">Payment Initiated</div>
                    <div className="text-sm text-gray-600">{payment.date} - Payment request created</div>
                  </div>
                </div>
                
                {payment.status === 'completed' && (
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-medium">Payment Completed</div>
                      <div className="text-sm text-gray-600">{payment.date} - Funds successfully transferred</div>
                    </div>
                  </div>
                )}

                {payment.status === 'pending' && (
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <div className="font-medium">Processing Payment</div>
                      <div className="text-sm text-gray-600">Payment is being processed</div>
                    </div>
                  </div>
                )}

                {payment.status === 'failed' && (
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-medium">Payment Failed</div>
                      <div className="text-sm text-gray-600">Payment could not be completed</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDetailsModal;
