
import React, { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Farmer {
  id: number;
  name: string;
  milkProduction: number;
  lastSubmission: string;
  quality: "High" | "Medium" | "Low";
}

interface DeleteCollectionModalProps {
  farmer: Farmer;
  onDelete: (farmerId: number) => void;
}

const DeleteCollectionModal = ({ farmer, onDelete }: DeleteCollectionModalProps) => {
  const { toast } = useToast();

  const handleDelete = () => {
    onDelete(farmer.id);
    
    toast({
      title: "Collection Deleted",
      description: `Milk collection for ${farmer.name} has been successfully deleted.`,
      variant: "destructive",
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
          <Trash2 className="w-4 h-4 mr-1" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Milk Collection</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the milk collection record for <strong>{farmer.name}</strong>? 
            This action cannot be undone and will permanently remove the collection data including {farmer.milkProduction}L of milk recorded on {farmer.lastSubmission}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete Collection
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCollectionModal;
