
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings, 
  Edit, 
  UserX, 
  UserCheck, 
  Shield, 
  ShieldCheck,
  MoreVertical 
} from "lucide-react";
import { Member } from "../types/member";

interface MemberActionsDropdownProps {
  member: Member;
}

const MemberActionsDropdown = ({ member }: MemberActionsDropdownProps) => {
  const [showDeregisterDialog, setShowDeregisterDialog] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const { toast } = useToast();

  const handleStatusChange = (newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Member status changed to ${newStatus}`,
    });
  };

  const handleRoleChange = (newRole: string) => {
    toast({
      title: "Role Updated",
      description: `Member role changed to ${newRole}`,
    });
    setShowRoleDialog(false);
  };

  const handleDeregister = () => {
    toast({
      title: "Member Deregistered",
      description: `${member.name} has been deregistered from the system`,
      variant: "destructive",
    });
    setShowDeregisterDialog(false);
  };

  const handleEdit = () => {
    toast({
      title: "Edit Member",
      description: "Opening member edit form...",
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Member Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={handleEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Details
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => setShowRoleDialog(true)}>
            <Shield className="w-4 h-4 mr-2" />
            Change Role
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          {member.status === "active" && (
            <DropdownMenuItem onClick={() => handleStatusChange("suspended")}>
              <UserX className="w-4 h-4 mr-2" />
              Suspend Member
            </DropdownMenuItem>
          )}
          
          {member.status === "suspended" && (
            <DropdownMenuItem onClick={() => handleStatusChange("active")}>
              <UserCheck className="w-4 h-4 mr-2" />
              Activate Member
            </DropdownMenuItem>
          )}
          
          {member.status === "pending" && (
            <DropdownMenuItem onClick={() => handleStatusChange("active")}>
              <UserCheck className="w-4 h-4 mr-2" />
              Approve Member
            </DropdownMenuItem>
          )}
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={() => setShowDeregisterDialog(true)}
            className="text-red-600 focus:text-red-600"
          >
            <UserX className="w-4 h-4 mr-2" />
            Deregister
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Role Change Dialog */}
      <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Member Role</DialogTitle>
            <DialogDescription>
              Select a new role for {member.name}. Current role: {member.role}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleRoleChange("farmer")}
              disabled={member.role === "farmer"}
            >
              <Shield className="w-4 h-4 mr-2" />
              Farmer
              {member.role === "farmer" && <Badge className="ml-auto">Current</Badge>}
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleRoleChange("manager")}
              disabled={member.role === "manager"}
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              Manager
              {member.role === "manager" && <Badge className="ml-auto">Current</Badge>}
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleRoleChange("admin")}
              disabled={member.role === "admin"}
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              Administrator
              {member.role === "admin" && <Badge className="ml-auto">Current</Badge>}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Deregister Confirmation Dialog */}
      <Dialog open={showDeregisterDialog} onOpenChange={setShowDeregisterDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deregistration</DialogTitle>
            <DialogDescription>
              Are you sure you want to deregister {member.name}? This action cannot be undone and will:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Remove the member from the cooperative</p>
            <p>• Archive all their records and activities</p>
            <p>• Stop all future milk submissions and payments</p>
            <p>• Require re-registration to rejoin</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeregisterDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeregister}>
              Deregister Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MemberActionsDropdown;
