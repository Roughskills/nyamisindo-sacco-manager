import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import AddUserModal from './AddUserModal';
import EditRoleModal from './EditRoleModal';
import ConfigurationModal from './ConfigurationModal';
import { 
  Users, 
  Shield, 
  Settings, 
  Key, 
  FileText, 
  Database, 
  Activity, 
  Wifi,
  Bell,
  Monitor,
  Search,
  Plus,
  Edit,
  Trash2,
  Lock,
  Unlock
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  permissions: string[];
}

interface UserSession {
  id: string;
  userId: string;
  userName: string;
  loginTime: string;
  ipAddress: string;
  device: string;
  status: 'active' | 'idle';
}

const SystemAdminPage = () => {
  const [activeTab, setActiveTab] = useState('user-management');
  const [searchTerm, setSearchTerm] = useState('');
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editRoleOpen, setEditRoleOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const [configType, setConfigType] = useState('');
  const [configTitle, setConfigTitle] = useState('');
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const { toast } = useToast();

  // Mock data
  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@nyamisindo.com',
      role: 'Administrator',
      status: 'active',
      lastLogin: '2024-01-15 09:30 AM',
      permissions: ['full_access', 'user_management', 'system_config']
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@nyamisindo.com',
      role: 'Manager',
      status: 'active',
      lastLogin: '2024-01-15 08:45 AM',
      permissions: ['member_management', 'reports', 'payments']
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@nyamisindo.com',
      role: 'Operator',
      status: 'inactive',
      lastLogin: '2024-01-14 05:20 PM',
      permissions: ['basic_access', 'data_entry']
    }
  ];

  const userSessions: UserSession[] = [
    {
      id: '1',
      userId: '1',
      userName: 'John Doe',
      loginTime: '2024-01-15 09:30 AM',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows',
      status: 'active'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Jane Smith',
      loginTime: '2024-01-15 08:45 AM',
      ipAddress: '192.168.1.101',
      device: 'Safari on macOS',
      status: 'active'
    },
    {
      id: '3',
      userId: '3',
      userName: 'Mike Johnson',
      loginTime: '2024-01-15 07:15 AM',
      ipAddress: '192.168.1.102',
      device: 'Firefox on Linux',
      status: 'idle'
    }
  ];

  const roles = [
    { id: '1', name: 'Administrator', users: 2, permissions: 15 },
    { id: '2', name: 'Manager', users: 5, permissions: 8 },
    { id: '3', name: 'Operator', users: 12, permissions: 4 },
    { id: '4', name: 'Viewer', users: 8, permissions: 2 }
  ];

  const systemStats = [
    { label: 'Total Users', value: '27', icon: Users, color: 'text-blue-600' },
    { label: 'Active Sessions', value: '18', icon: Monitor, color: 'text-green-600' },
    { label: 'Failed Logins (24h)', value: '3', icon: Shield, color: 'text-red-600' },
    { label: 'API Calls (Today)', value: '1,234', icon: Wifi, color: 'text-purple-600' }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800',
      idle: 'bg-yellow-100 text-yellow-800'
    };
    return variants[status as keyof typeof variants] || variants.inactive;
  };

  const handleUserAction = (action: string, userId?: string) => {
    toast({
      title: "Action Performed",
      description: `${action} action has been executed${userId ? ` for user ${userId}` : ''}`,
    });
  };

  const handleRoleEdit = (role: any) => {
    setSelectedRole(role);
    setEditRoleOpen(true);
  };

  const handleConfiguration = (type: string, title: string) => {
    setConfigType(type);
    setConfigTitle(title);
    setConfigOpen(true);
  };

  const handleEndSession = (sessionId: string) => {
    toast({
      title: "Session Ended",
      description: `Session ${sessionId} has been terminated`,
    });
  };

  return (
    <div className="space-y-6">
      {/* System Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Admin Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="user-management">Users</TabsTrigger>
          <TabsTrigger value="access-control">Access</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system-config">System</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="user-console">Console</TabsTrigger>
        </TabsList>

        {/* User Management Tab */}
        <TabsContent value="user-management" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Management
                </CardTitle>
                <Button onClick={() => setAddUserOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">Last login: {user.lastLogin}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusBadge(user.status)}>
                        {user.status}
                      </Badge>
                      <Badge variant="outline">{user.role}</Badge>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => handleUserAction('Edit', user.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleUserAction('Delete', user.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Access Control Tab */}
        <TabsContent value="access-control" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Role Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roles.map((role) => (
                    <div key={role.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{role.name}</h3>
                        <p className="text-sm text-gray-600">{role.users} users • {role.permissions} permissions</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleRoleEdit(role)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Access Rights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Employee Management', 'User Privileges', 'General Control', 'Loans Control', 'Accounts Control', 'API Channels'].map((right, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{right}</span>
                      <Button variant="ghost" size="sm" onClick={() => handleConfiguration('access', right)}>
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Authentication & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Multi-Factor Authentication</span>
                    <Button variant="outline" size="sm" onClick={() => handleConfiguration('mfa', 'Multi-Factor Authentication')}>Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Password Policies</span>
                    <Button variant="outline" size="sm" onClick={() => handleConfiguration('password', 'Password Policies')}>Edit</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Security Logs</span>
                    <Button variant="outline" size="sm" onClick={() => handleUserAction('View Security Logs')}>View</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Session Timeout</span>
                    <Button variant="outline" size="sm" onClick={() => handleConfiguration('session', 'Session Timeout')}>Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Audit Logs card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Audit Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-gray-50 rounded">
                    <p className="font-medium">User Login: john@nyamisindo.com</p>
                    <p className="text-gray-600">2024-01-15 09:30 AM</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <p className="font-medium">Permission Changed: jane@nyamisindo.com</p>
                    <p className="text-gray-600">2024-01-15 08:15 AM</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <p className="font-medium">System Backup Completed</p>
                    <p className="text-gray-600">2024-01-15 02:00 AM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Configuration Tab */}
        <TabsContent value="system-config" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>System Workflows</span>
                    <Button variant="outline" size="sm" onClick={() => handleConfiguration('workflows', 'System Workflows')}>Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Business Preferences</span>
                    <Button variant="outline" size="sm" onClick={() => handleConfiguration('preferences', 'Business Preferences')}>Edit</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Integration Settings</span>
                    <Button variant="outline" size="sm" onClick={() => handleConfiguration('integrations', 'Integration Settings')}>Manage</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Notification Config</span>
                    <Button variant="outline" size="sm" onClick={() => handleConfiguration('notifications', 'Notification Configuration')}>Setup</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Backup & Recovery</span>
                    <Button variant="outline" size="sm" onClick={() => handleConfiguration('backup', 'Backup & Recovery')}>Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Data Export</span>
                    <Button variant="outline" size="sm" onClick={() => handleUserAction('Export Data')}>Export</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Storage Usage</span>
                    <Button variant="outline" size="sm" onClick={() => handleUserAction('Monitor Storage')}>Monitor</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Data Cleanup</span>
                    <Button variant="outline" size="sm" onClick={() => handleConfiguration('cleanup', 'Data Cleanup Schedule')}>Schedule</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Performance Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>CPU Usage</span>
                    <span className="text-green-600 font-medium">23%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Memory Usage</span>
                    <span className="text-yellow-600 font-medium">67%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Storage Usage</span>
                    <span className="text-blue-600 font-medium">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Network Traffic</span>
                    <span className="text-purple-600 font-medium">Normal</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Alerts & Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-red-50 rounded border-l-4 border-red-400">
                    <p className="font-medium text-red-800">High Memory Usage Alert</p>
                    <p className="text-red-600">5 minutes ago</p>
                  </div>
                  <div className="p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
                    <p className="font-medium text-yellow-800">Backup Schedule Warning</p>
                    <p className="text-yellow-600">1 hour ago</p>
                  </div>
                  <div className="p-2 bg-green-50 rounded border-l-4 border-green-400">
                    <p className="font-medium text-green-800">System Update Complete</p>
                    <p className="text-green-600">2 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* User Console Tab */}
        <TabsContent value="user-console" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Active User Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{session.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{session.userName}</h3>
                        <p className="text-sm text-gray-600">IP: {session.ipAddress}</p>
                        <p className="text-xs text-gray-500">Device: {session.device}</p>
                        <p className="text-xs text-gray-500">Login: {session.loginTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusBadge(session.status)}>
                        {session.status}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={() => handleEndSession(session.id)}>
                        <Lock className="h-4 w-4 mr-1" />
                        End Session
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <AddUserModal open={addUserOpen} onOpenChange={setAddUserOpen} />
      <EditRoleModal open={editRoleOpen} onOpenChange={setEditRoleOpen} role={selectedRole} />
      <ConfigurationModal 
        open={configOpen} 
        onOpenChange={setConfigOpen} 
        type={configType}
        title={configTitle}
      />
    </div>
  );
};

export default SystemAdminPage;
