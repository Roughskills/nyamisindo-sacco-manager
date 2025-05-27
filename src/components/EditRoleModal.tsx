
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface EditRoleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role?: { id: string; name: string; permissions: number };
}

const EditRoleModal = ({ open, onOpenChange, role }: EditRoleModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: role?.name || '',
    permissions: [] as string[],
  });

  const availablePermissions = [
    'Employee Management',
    'User Privileges',
    'General Control',
    'Loans Control',
    'Accounts Control',
    'API Channels',
    'Reports Access',
    'System Configuration'
  ];

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        permissions: [...prev.permissions, permission]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.filter(p => p !== permission)
      }));
    }
  };

  const handleSubmit = () => {
    if (!formData.name) {
      toast({
        title: "Error",
        description: "Please enter a role name",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: `Role "${formData.name}" has been updated successfully`,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{role ? 'Edit Role' : 'Create Role'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="roleName">Role Name *</Label>
            <Input
              id="roleName"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter role name"
            />
          </div>

          <div>
            <Label>Permissions</Label>
            <div className="space-y-2 mt-2">
              {availablePermissions.map((permission) => (
                <div key={permission} className="flex items-center space-x-2">
                  <Checkbox
                    id={permission}
                    checked={formData.permissions.includes(permission)}
                    onCheckedChange={(checked) => handlePermissionChange(permission, checked as boolean)}
                  />
                  <Label htmlFor={permission} className="text-sm">
                    {permission}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {role ? 'Update Role' : 'Create Role'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditRoleModal;
