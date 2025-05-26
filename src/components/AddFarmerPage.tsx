
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, UserPlus } from "lucide-react";
import Sidebar from "./Sidebar";

const AddFarmerPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    nationalId: "",
    location: "",
    district: "",
    sector: "",
    cell: "",
    village: "",
    farmArea: "",
    cattleCount: "",
    milkCapacity: "",
    farmingExperience: "",
    cooperativeMember: "",
    bankAccount: "",
    nextOfKin: "",
    nextOfKinPhone: "",
    emergencyContact: "",
    notes: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Farmer registration data:", formData);
    // Here you would typically send the data to your backend
    alert("Farmer registered successfully!");
    navigate("/");
  };

  return (
    <div 
      className="min-h-screen flex"
      style={{
        backgroundImage: `url('/lovable-uploads/5ed5d582-509e-412c-aa4b-ff19eb8841ba.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Sidebar activeTab="farmers" setActiveTab={() => {}} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="mb-4 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Milk Analytics
            </Button>
            
            <div className="flex items-center gap-3 mb-2">
              <UserPlus className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">Add New Farmer</h1>
            </div>
            <p className="text-gray-600">Register a new farmer to the cooperative system</p>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-green-800">Farmer Registration Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter farmer's full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+250 788 123 456"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="farmer@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationalId">National ID *</Label>
                    <Input
                      id="nationalId"
                      value={formData.nationalId}
                      onChange={(e) => handleInputChange("nationalId", e.target.value)}
                      placeholder="1234567890123456"
                      required
                    />
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Location Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">General Location *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="Kigali, Gasabo District"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district">District *</Label>
                      <Select value={formData.district} onValueChange={(value) => handleInputChange("district", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gasabo">Gasabo</SelectItem>
                          <SelectItem value="nyarugenge">Nyarugenge</SelectItem>
                          <SelectItem value="kicukiro">Kicukiro</SelectItem>
                          <SelectItem value="nyagatare">Nyagatare</SelectItem>
                          <SelectItem value="muhanga">Muhanga</SelectItem>
                          <SelectItem value="musanze">Musanze</SelectItem>
                          <SelectItem value="rwamagana">Rwamagana</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sector">Sector</Label>
                      <Input
                        id="sector"
                        value={formData.sector}
                        onChange={(e) => handleInputChange("sector", e.target.value)}
                        placeholder="Enter sector"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cell">Cell</Label>
                      <Input
                        id="cell"
                        value={formData.cell}
                        onChange={(e) => handleInputChange("cell", e.target.value)}
                        placeholder="Enter cell"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="village">Village</Label>
                      <Input
                        id="village"
                        value={formData.village}
                        onChange={(e) => handleInputChange("village", e.target.value)}
                        placeholder="Enter village"
                      />
                    </div>
                  </div>
                </div>

                {/* Farm Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Farm Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="farmArea">Farm Area (hectares) *</Label>
                      <Input
                        id="farmArea"
                        value={formData.farmArea}
                        onChange={(e) => handleInputChange("farmArea", e.target.value)}
                        placeholder="2.5"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cattleCount">Number of Cattle *</Label>
                      <Input
                        id="cattleCount"
                        type="number"
                        value={formData.cattleCount}
                        onChange={(e) => handleInputChange("cattleCount", e.target.value)}
                        placeholder="15"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="milkCapacity">Daily Milk Capacity (Liters)</Label>
                      <Input
                        id="milkCapacity"
                        type="number"
                        value={formData.milkCapacity}
                        onChange={(e) => handleInputChange("milkCapacity", e.target.value)}
                        placeholder="25"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="farmingExperience">Farming Experience (Years)</Label>
                      <Input
                        id="farmingExperience"
                        type="number"
                        value={formData.farmingExperience}
                        onChange={(e) => handleInputChange("farmingExperience", e.target.value)}
                        placeholder="10"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cooperativeMember">Previous Cooperative Member</Label>
                      <Select value={formData.cooperativeMember} onValueChange={(value) => handleInputChange("cooperativeMember", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankAccount">Bank Account Number</Label>
                      <Input
                        id="bankAccount"
                        value={formData.bankAccount}
                        onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                        placeholder="Account number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nextOfKin">Next of Kin</Label>
                      <Input
                        id="nextOfKin"
                        value={formData.nextOfKin}
                        onChange={(e) => handleInputChange("nextOfKin", e.target.value)}
                        placeholder="Next of kin name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nextOfKinPhone">Next of Kin Phone</Label>
                      <Input
                        id="nextOfKinPhone"
                        value={formData.nextOfKinPhone}
                        onChange={(e) => handleInputChange("nextOfKinPhone", e.target.value)}
                        placeholder="+250 788 123 456"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      <Input
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                        placeholder="Emergency contact"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      placeholder="Any additional information about the farmer..."
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700 flex-1">
                    Register Farmer
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate("/")} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AddFarmerPage;
