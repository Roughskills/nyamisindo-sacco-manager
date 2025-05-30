
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, User, DollarSign, FileText, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface NewLoanApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewLoanApplicationModal = ({ isOpen, onClose }: NewLoanApplicationModalProps) => {
  const [formData, setFormData] = useState({
    farmerName: "",
    farmerId: "",
    loanAmount: "",
    purpose: "",
    interestRate: "",
    termMonths: "",
    collateral: "",
    monthlyIncome: "",
    existingDebts: "",
    requestedDate: null as Date | null,
    description: ""
  });

  const formatCurrency = (value: string) => {
    const number = value.replace(/[^\d]/g, "");
    return new Intl.NumberFormat('en-UG').format(Number(number));
  };

  const handleAmountChange = (field: string, value: string) => {
    const numericValue = value.replace(/[^\d]/g, "");
    setFormData(prev => ({ ...prev, [field]: numericValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New loan application:", formData);
    // Here you would typically call an API to submit the loan application
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-800 flex items-center gap-2">
            <FileText className="h-6 w-6" />
            New Loan Application
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Applicant Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              Applicant Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="farmerName">Full Name *</Label>
                <Input
                  id="farmerName"
                  value={formData.farmerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, farmerName: e.target.value }))}
                  placeholder="Enter farmer's full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="farmerId">Farmer ID</Label>
                <Input
                  id="farmerId"
                  value={formData.farmerId}
                  onChange={(e) => setFormData(prev => ({ ...prev, farmerId: e.target.value }))}
                  placeholder="Enter farmer ID"
                />
              </div>
            </div>
          </div>

          {/* Loan Details */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Loan Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="loanAmount">Loan Amount (UGX) *</Label>
                <Input
                  id="loanAmount"
                  value={formatCurrency(formData.loanAmount)}
                  onChange={(e) => handleAmountChange("loanAmount", e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
              <div>
                <Label htmlFor="purpose">Loan Purpose *</Label>
                <Select value={formData.purpose} onValueChange={(value) => setFormData(prev => ({ ...prev, purpose: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cow-purchase">Cow Purchase</SelectItem>
                    <SelectItem value="farm-equipment">Farm Equipment</SelectItem>
                    <SelectItem value="barn-construction">Barn Construction</SelectItem>
                    <SelectItem value="feed-purchase">Feed Purchase</SelectItem>
                    <SelectItem value="land-expansion">Land Expansion</SelectItem>
                    <SelectItem value="veterinary-services">Veterinary Services</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  value={formData.interestRate}
                  onChange={(e) => setFormData(prev => ({ ...prev, interestRate: e.target.value }))}
                  placeholder="12.5"
                  type="number"
                  step="0.1"
                />
              </div>
              <div>
                <Label htmlFor="termMonths">Loan Term (Months) *</Label>
                <Select value={formData.termMonths} onValueChange={(value) => setFormData(prev => ({ ...prev, termMonths: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6 Months</SelectItem>
                    <SelectItem value="12">12 Months</SelectItem>
                    <SelectItem value="18">18 Months</SelectItem>
                    <SelectItem value="24">24 Months</SelectItem>
                    <SelectItem value="36">36 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="requestedDate">Requested Disbursement Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.requestedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.requestedDate ? format(formData.requestedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.requestedDate}
                      onSelect={(date) => setFormData(prev => ({ ...prev, requestedDate: date }))}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Financial Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="monthlyIncome">Monthly Income (UGX)</Label>
                <Input
                  id="monthlyIncome"
                  value={formatCurrency(formData.monthlyIncome)}
                  onChange={(e) => handleAmountChange("monthlyIncome", e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="existingDebts">Existing Debts (UGX)</Label>
                <Input
                  id="existingDebts"
                  value={formatCurrency(formData.existingDebts)}
                  onChange={(e) => handleAmountChange("existingDebts", e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Collateral & Additional Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="collateral">Collateral Description</Label>
              <Textarea
                id="collateral"
                value={formData.collateral}
                onChange={(e) => setFormData(prev => ({ ...prev, collateral: e.target.value }))}
                placeholder="Describe the collateral offered for this loan..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="description">Additional Information</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Any additional information about this loan application..."
                rows={3}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Submit Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewLoanApplicationModal;
