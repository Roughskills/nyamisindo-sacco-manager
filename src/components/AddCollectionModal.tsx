
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, User, Droplets, Scale, Clock, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddCollectionModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    farmerName: '',
    farmerId: '',
    collectionDate: '',
    collectionTime: '',
    milkQuantity: '',
    milkQuality: '',
    collectionPoint: '',
    clerkName: '',
    notes: ''
  });
  
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.farmerName || !formData.farmerId || !formData.milkQuantity) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Log the collection data (in real app, this would save to database)
    console.log('Collection Data:', formData);
    
    toast({
      title: "Success",
      description: "Milk collection recorded successfully",
    });
    
    // Reset form and close modal
    setFormData({
      farmerName: '',
      farmerId: '',
      collectionDate: '',
      collectionTime: '',
      milkQuantity: '',
      milkQuality: '',
      collectionPoint: '',
      clerkName: '',
      notes: ''
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
          <Droplets className="w-4 h-4 mr-2" />
          Add Collection
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-blue-700">
            Record Milk Collection
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Farmer Information */}
                <div className="space-y-2">
                  <Label htmlFor="farmerName" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Farmer Name *
                  </Label>
                  <Input
                    id="farmerName"
                    value={formData.farmerName}
                    onChange={(e) => handleInputChange('farmerName', e.target.value)}
                    placeholder="Enter farmer name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmerId">Farmer ID *</Label>
                  <Input
                    id="farmerId"
                    value={formData.farmerId}
                    onChange={(e) => handleInputChange('farmerId', e.target.value)}
                    placeholder="Enter farmer ID"
                    required
                  />
                </div>

                {/* Collection Details */}
                <div className="space-y-2">
                  <Label htmlFor="collectionDate" className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    Collection Date
                  </Label>
                  <Input
                    id="collectionDate"
                    type="date"
                    value={formData.collectionDate}
                    onChange={(e) => handleInputChange('collectionDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collectionTime" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Collection Time
                  </Label>
                  <Input
                    id="collectionTime"
                    type="time"
                    value={formData.collectionTime}
                    onChange={(e) => handleInputChange('collectionTime', e.target.value)}
                  />
                </div>

                {/* Milk Information */}
                <div className="space-y-2">
                  <Label htmlFor="milkQuantity" className="flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    Milk Quantity (Liters) *
                  </Label>
                  <Input
                    id="milkQuantity"
                    type="number"
                    step="0.1"
                    value={formData.milkQuantity}
                    onChange={(e) => handleInputChange('milkQuantity', e.target.value)}
                    placeholder="Enter quantity in liters"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="milkQuality">Milk Quality Grade</Label>
                  <select
                    id="milkQuality"
                    value={formData.milkQuality}
                    onChange={(e) => handleInputChange('milkQuality', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select quality grade</option>
                    <option value="Grade A">Grade A</option>
                    <option value="Grade B">Grade B</option>
                    <option value="Grade C">Grade C</option>
                  </select>
                </div>

                {/* Location and Clerk */}
                <div className="space-y-2">
                  <Label htmlFor="collectionPoint" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Collection Point
                  </Label>
                  <Input
                    id="collectionPoint"
                    value={formData.collectionPoint}
                    onChange={(e) => handleInputChange('collectionPoint', e.target.value)}
                    placeholder="Enter collection point"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clerkName">Collection Clerk</Label>
                  <Input
                    id="clerkName"
                    value={formData.clerkName}
                    onChange={(e) => handleInputChange('clerkName', e.target.value)}
                    placeholder="Enter clerk name"
                  />
                </div>

                {/* Notes */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Enter any additional notes or observations"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700"
            >
              Record Collection
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCollectionModal;
