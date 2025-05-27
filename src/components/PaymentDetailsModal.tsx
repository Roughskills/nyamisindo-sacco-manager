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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CreditCard, Smartphone, Building2, Calendar, DollarSign, Hash, User, FileText, Printer } from "lucide-react";

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

  const getMethodImage = (method: string) => {
    switch (method) {
      case 'airtel':
        return '/lovable-uploads/02ac8073-82cb-4474-8cb0-65b4acf18188.png';
      case 'mtn':
        return '/lovable-uploads/c09eb5a0-bc8a-48bf-a0bb-906aebc779a6.png';
      case 'bank':
        return '/lovable-uploads/38792e50-48c0-4f46-92fc-820a2ff1f442.png';
      default:
        return '';
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

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Payment Receipt - ${payment.reference}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              line-height: 1.6;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .status {
              display: inline-block;
              padding: 8px 16px;
              border-radius: 4px;
              font-weight: bold;
              margin: 20px 0;
            }
            .status.completed { background-color: #d4edda; color: #155724; }
            .status.pending { background-color: #fff3cd; color: #856404; }
            .status.failed { background-color: #f8d7da; color: #721c24; }
            .payment-info {
              background-color: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin: 20px 0;
            }
            .info-item {
              margin-bottom: 15px;
            }
            .info-label {
              font-weight: bold;
              color: #666;
              font-size: 14px;
            }
            .info-value {
              font-size: 16px;
              margin-top: 5px;
            }
            .amount {
              color: #28a745;
              font-size: 24px;
              font-weight: bold;
            }
            .method-section {
              background-color: #e9ecef;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .method-image {
              width: 80px;
              height: 40px;
              object-fit: contain;
              margin-right: 15px;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              font-size: 12px;
              color: #666;
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Payment Receipt</h1>
            <p>Transaction Reference: ${payment.reference}</p>
            <div class="status ${payment.status}">${payment.status.toUpperCase()}</div>
          </div>

          <div class="payment-info">
            <h2>Payment Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Recipient</div>
                <div class="info-value">${payment.farmerName}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Amount</div>
                <div class="info-value amount">${formatCurrency(payment.amount)}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Date & Time</div>
                <div class="info-value">
                  ${new Date(payment.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}<br>
                  ${new Date(payment.date).toLocaleTimeString('en-US')}
                </div>
              </div>
              <div class="info-item">
                <div class="info-label">Reference Number</div>
                <div class="info-value" style="font-family: monospace; background: #f8f9fa; padding: 8px; border-radius: 4px;">${payment.reference}</div>
              </div>
            </div>
            <div class="info-item">
              <div class="info-label">Description</div>
              <div class="info-value">${payment.description}</div>
            </div>
          </div>

          <div class="method-section">
            <h2>Payment Method</h2>
            <div style="display: flex; align-items: center; margin: 20px 0;">
              <img src="${getMethodImage(payment.method)}" alt="${getMethodName(payment.method)}" class="method-image" />
              <div>
                <div class="info-label">Method</div>
                <div class="info-value">${getMethodName(payment.method)}</div>
              </div>
            </div>
            ${payment.method === 'airtel' ? `
              <div class="info-item">
                <div class="info-label">Network</div>
                <div class="info-value">Airtel Uganda</div>
              </div>
            ` : ''}
            ${payment.method === 'mtn' ? `
              <div class="info-item">
                <div class="info-label">Network</div>
                <div class="info-value">MTN Uganda</div>
              </div>
            ` : ''}
            ${payment.method === 'bank' ? `
              <div class="info-item">
                <div class="info-label">Transfer Type</div>
                <div class="info-value">Bank Transfer</div>
              </div>
            ` : ''}
          </div>

          <div class="footer">
            <p>This is an automated receipt generated on ${new Date().toLocaleString()}</p>
            <p>For any inquiries, please contact support with reference number: ${payment.reference}</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Payment Details
            </div>
            <Button
              onClick={handlePrint}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Printer className="h-4 w-4" />
              Print Receipt
            </Button>
          </DialogTitle>
          <DialogDescription>
            Complete payment information for transaction {payment.reference}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[75vh] px-6 pb-6">
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
                  {/* Payment Method Image and Info */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <img 
                      src={getMethodImage(payment.method)} 
                      alt={getMethodName(payment.method)}
                      className="w-20 h-10 object-contain"
                    />
                    <div>
                      <div className="font-semibold text-lg">{getMethodName(payment.method)}</div>
                      <div className="text-sm text-gray-600">Primary payment method</div>
                    </div>
                  </div>

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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDetailsModal;
