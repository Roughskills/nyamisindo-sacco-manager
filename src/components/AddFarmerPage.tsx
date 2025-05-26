
import { useState } from "react";
import Sidebar from "./Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  UserPlus, 
  User, 
  Phone, 
  MapPin, 
  Milk, 
  Square,
  Upload,
  Save,
  ArrowLeft
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AddFarmerPage = () => {
  const [activeTab, setActiveTab] = useState("farmers"); // Keep it on farmers/milk analytics
  const { user } = useAuth();
  const navigate = useNavigate();

  const [farmerData, setFarmerData] = useState({
    name: "",
    phone: "",
    location: "",
    farmArea: "",
    farmAreaUnit: "hectares",
    expectedDailyMilk: "",
    photo: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setFarmerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFarmerData(prev => ({
        ...prev,
        photo: file
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Farmer data:", farmerData);
    // Here you would typically send the data to your backend
    alert("Farmer registered successfully!");
  };

  const handleBackToFarmers = () => {
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
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <UserPlus className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">Add New Farmer</h1>
            </div>
            <p className="text-gray-600">Register a new farmer to join the cooperative</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Button 
                variant="ghost" 
                onClick={handleBackToFarmers}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Milk Analytics
              </Button>
            </div>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-3">
                  <UserPlus className="w-6 h-6" />
                  Add New Farmer
                </CardTitle>
                <CardDescription>
                  Register a new farmer to the cooperative system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Photo Upload Section */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarFallback className="bg-green-100 text-green-800 text-2xl">
                          {farmerData.name ? farmerData.name.charAt(0).toUpperCase() : <User className="w-8 h-8" />}
                        </AvatarFallback>
                      </Avatar>
                      <input
                        type="file"
                        id="photo-upload"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="absolute -bottom-2 -right-2 rounded-full p-2"
                        onClick={() => document.getElementById('photo-upload')?.click()}
                      >
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600">Upload farmer photo</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <User className="w-5 h-5 text-green-600" />
                        Personal Information
                      </h3>
                      
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          value={farmerData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Enter farmer's full name"
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={farmerData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+250 788 123 456"
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          type="text"
                          value={farmerData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          placeholder="District, Province"
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    {/* Farm Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Square className="w-5 h-5 text-green-600" />
                        Farm Information
                      </h3>

                      <div>
                        <Label htmlFor="farmArea">Farm Area *</Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            id="farmArea"
                            type="number"
                            step="0.1"
                            value={farmerData.farmArea}
                            onChange={(e) => handleInputChange("farmArea", e.target.value)}
                            placeholder="2.5"
                            required
                            className="flex-1"
                          />
                          <select
                            value={farmerData.farmAreaUnit}
                            onChange={(e) => handleInputChange("farmAreaUnit", e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md bg-white"
                          >
                            <option value="hectares">Hectares</option>
                            <option value="acres">Acres</option>
                            <option value="square_meters">Square Meters</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="expectedDailyMilk">Expected Daily Milk Production *</Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            id="expectedDailyMilk"
                            type="number"
                            step="0.1"
                            value={farmerData.expectedDailyMilk}
                            onChange={(e) => handleInputChange("expectedDailyMilk", e.target.value)}
                            placeholder="25"
                            required
                            className="flex-1"
                          />
                          <span className="flex items-center px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                            Liters
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Milk className="w-5 h-5 text-green-600" />
                      Additional Details
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="cowCount">Number of Cows</Label>
                        <Input
                          id="cowCount"
                          type="number"
                          placeholder="5"
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input
                          id="experience"
                          type="number"
                          placeholder="10"
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cooperativeId">Cooperative ID</Label>
                        <Input
                          id="cooperativeId"
                          type="text"
                          placeholder="COOP-2024-001"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-4 pt-6 border-t">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={handleBackToFarmers}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Register Farmer
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddFarmerPage;
