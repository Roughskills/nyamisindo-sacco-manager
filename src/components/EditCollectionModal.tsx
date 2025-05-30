
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Farmer {
  id: number;
  name: string;
  milkProduction: number;
  lastSubmission: string;
  quality: "High" | "Medium" | "Low";
}

interface EditCollectionModalProps {
  farmer: Farmer;
  onUpdate: (updatedFarmer: Farmer) => void;
}

const EditCollectionModal = ({ farmer, onUpdate }: EditCollectionModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: farmer.name,
    milkProduction: farmer.milkProduction.toString(),
    quality: farmer.quality,
    lastSubmission: farmer.lastSubmission,
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedFarmer: Farmer = {
      ...farmer,
      name: formData.name,
      milkProduction: parseFloat(formData.milkProduction),
      quality: formData.quality as "High" | "Medium" | "Low",
      lastSubmission: formData.lastSubmission,
    };

    onUpdate(updatedFarmer);
    setIsOpen(false);
    
    toast({
      title: "Collection Updated",
      description: "Milk collection details have been successfully updated.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mr-2">
          <Edit className="w-4 h-4 mr-1" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Milk Collection</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="farmer-name">Farmer Name</Label>
            <Input
              id="farmer-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="milk-production">Milk Production (L)</Label>
            <Input
              id="milk-production"
              type="number"
              step="0.1"
              min="0"
              value={formData.milkProduction}
              onChange={(e) => setFormData({ ...formData, milkProduction: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quality">Quality</Label>
            <Select value={formData.quality} onValueChange={(value) => setFormData({ ...formData, quality: value as "High" | "Medium" | "Low" })}>
              <SelectTrigger>
                <SelectValue placeholder="Select quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="last-submission">Last Submission Date</Label>
            <Input
              id="last-submission"
              type="date"
              value={formData.lastSubmission}
              onChange={(e) => setFormData({ ...formData, lastSubmission: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Update Collection
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCollectionModal;
