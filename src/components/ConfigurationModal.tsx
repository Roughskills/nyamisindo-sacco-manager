
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
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface ConfigurationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: string;
  title: string;
}

const ConfigurationModal = ({ open, onOpenChange, type, title }: ConfigurationModalProps) => {
  const { toast } = useToast();
  const [config, setConfig] = useState({
    enabled: false,
    value: '',
    description: '',
  });

  const handleSubmit = () => {
    toast({
      title: "Configuration Updated",
      description: `${title} has been configured successfully`,
    });
    onOpenChange(false);
  };

  const renderConfigFields = () => {
    switch (type) {
      case 'mfa':
        return (
          <>
            <div className="flex items-center space-x-2">
              <Switch
                checked={config.enabled}
                onCheckedChange={(checked) => setConfig(prev => ({ ...prev, enabled: checked }))}
              />
              <Label>Enable Multi-Factor Authentication</Label>
            </div>
            <div>
              <Label>Backup Codes</Label>
              <Input placeholder="Generate backup codes" />
            </div>
          </>
        );
      case 'password':
        return (
          <>
            <div>
              <Label>Minimum Length</Label>
              <Input type="number" placeholder="8" />
            </div>
            <div>
              <Label>Complexity Requirements</Label>
              <Textarea placeholder="Enter password requirements..." />
            </div>
          </>
        );
      case 'session':
        return (
          <>
            <div>
              <Label>Session Timeout (minutes)</Label>
              <Input type="number" placeholder="30" />
            </div>
            <div>
              <Label>Idle Timeout (minutes)</Label>
              <Input type="number" placeholder="15" />
            </div>
          </>
        );
      case 'backup':
        return (
          <>
            <div>
              <Label>Backup Schedule</Label>
              <Input placeholder="Daily at 2:00 AM" />
            </div>
            <div>
              <Label>Retention Period (days)</Label>
              <Input type="number" placeholder="30" />
            </div>
          </>
        );
      default:
        return (
          <>
            <div>
              <Label>Configuration Value</Label>
              <Input
                value={config.value}
                onChange={(e) => setConfig(prev => ({ ...prev, value: e.target.value }))}
                placeholder="Enter configuration value"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={config.description}
                onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter description"
              />
            </div>
          </>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {renderConfigFields()}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Save Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigurationModal;
