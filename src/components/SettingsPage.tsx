
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Monitor, 
  Wifi, 
  Shield, 
  HardDrive, 
  Download, 
  Battery,
  Palette,
  Network,
  Lock,
  Folder,
  RefreshCw,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Display & Accessibility
    theme: "light",
    fontSize: "medium",
    resolution: "1920x1080",
    accessibility: {
      highContrast: false,
      screenReader: false,
      keyboardNavigation: true
    },
    
    // Network & Connectivity
    network: {
      wifi: true,
      bluetooth: false,
      vpn: false,
      autoConnect: true
    },
    
    // Security & Privacy
    security: {
      twoFactor: true,
      passwordExpiry: "90",
      encryption: true,
      firewall: true,
      sessionTimeout: "30"
    },
    
    // Storage & File Management
    storage: {
      autoBackup: true,
      cloudSync: true,
      compressionLevel: "medium",
      retentionPeriod: "365"
    },
    
    // Software & Updates
    updates: {
      autoUpdate: true,
      updateChannel: "stable",
      autoRestart: false,
      maintenanceWindow: "02:00"
    },
    
    // Power & Performance
    performance: {
      powerMode: "balanced",
      sleepTimer: "15",
      cpuOptimization: true,
      memoryOptimization: false
    }
  });

  const handleSave = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  const handleReset = (section: string) => {
    toast({
      title: "Settings Reset",
      description: `${section} settings have been reset to defaults.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
          <p className="text-gray-600">Configure system preferences and options</p>
        </div>
        <Badge variant="outline" className="text-green-600">
          All Systems Operational
        </Badge>
      </div>

      <Tabs defaultValue="display" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="display" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            Display
          </TabsTrigger>
          <TabsTrigger value="network" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            Network
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="storage" className="flex items-center gap-2">
            <HardDrive className="h-4 w-4" />
            Storage
          </TabsTrigger>
          <TabsTrigger value="updates" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Updates
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Battery className="h-4 w-4" />
            Performance
          </TabsTrigger>
        </TabsList>

        {/* Display & Accessibility */}
        <TabsContent value="display">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-blue-600" />
                Display & Accessibility
              </CardTitle>
              <CardDescription>
                Configure display settings, themes, and accessibility options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={settings.theme} onValueChange={(value) => 
                      setSettings(prev => ({ ...prev, theme: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fontSize">Font Size</Label>
                    <Select value={settings.fontSize} onValueChange={(value) => 
                      setSettings(prev => ({ ...prev, fontSize: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="extra-large">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resolution">Screen Resolution</Label>
                    <Select value={settings.resolution} onValueChange={(value) => 
                      setSettings(prev => ({ ...prev, resolution: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1366x768">1366 x 768</SelectItem>
                        <SelectItem value="1920x1080">1920 x 1080</SelectItem>
                        <SelectItem value="2560x1440">2560 x 1440</SelectItem>
                        <SelectItem value="3840x2160">3840 x 2160</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Accessibility Options</h4>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="highContrast">High Contrast Mode</Label>
                    <Switch 
                      id="highContrast"
                      checked={settings.accessibility.highContrast}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          accessibility: { ...prev.accessibility, highContrast: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="screenReader">Screen Reader Support</Label>
                    <Switch 
                      id="screenReader"
                      checked={settings.accessibility.screenReader}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          accessibility: { ...prev.accessibility, screenReader: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="keyboardNav">Keyboard Navigation</Label>
                    <Switch 
                      id="keyboardNav"
                      checked={settings.accessibility.keyboardNavigation}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          accessibility: { ...prev.accessibility, keyboardNavigation: checked }
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => handleReset("Display")}>
                  Reset to Defaults
                </Button>
                <Button onClick={() => handleSave("Display")} className="bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Network & Connectivity */}
        <TabsContent value="network">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="h-5 w-5 text-green-600" />
                Network & Connectivity
              </CardTitle>
              <CardDescription>
                Manage network connections, Wi-Fi, Bluetooth, and VPN settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Connection Status</h4>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="wifi">Wi-Fi</Label>
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="wifi"
                        checked={settings.network.wifi}
                        onCheckedChange={(checked) => 
                          setSettings(prev => ({
                            ...prev,
                            network: { ...prev.network, wifi: checked }
                          }))
                        }
                      />
                      <Badge variant={settings.network.wifi ? "default" : "secondary"}>
                        {settings.network.wifi ? "Connected" : "Disconnected"}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="bluetooth">Bluetooth</Label>
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="bluetooth"
                        checked={settings.network.bluetooth}
                        onCheckedChange={(checked) => 
                          setSettings(prev => ({
                            ...prev,
                            network: { ...prev.network, bluetooth: checked }
                          }))
                        }
                      />
                      <Badge variant={settings.network.bluetooth ? "default" : "secondary"}>
                        {settings.network.bluetooth ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="vpn">VPN Connection</Label>
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="vpn"
                        checked={settings.network.vpn}
                        onCheckedChange={(checked) => 
                          setSettings(prev => ({
                            ...prev,
                            network: { ...prev.network, vpn: checked }
                          }))
                        }
                      />
                      <Badge variant={settings.network.vpn ? "default" : "secondary"}>
                        {settings.network.vpn ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Network Preferences</h4>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoConnect">Auto-connect to known networks</Label>
                    <Switch 
                      id="autoConnect"
                      checked={settings.network.autoConnect}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          network: { ...prev.network, autoConnect: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Network Diagnostics</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Test Connection
                      </Button>
                      <Button variant="outline" size="sm">
                        Reset Network
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => handleReset("Network")}>
                  Reset to Defaults
                </Button>
                <Button onClick={() => handleSave("Network")} className="bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security & Privacy */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-red-600" />
                Security & Privacy
              </CardTitle>
              <CardDescription>
                Configure authentication, encryption, and security policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Authentication</h4>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                    <Switch 
                      id="twoFactor"
                      checked={settings.security.twoFactor}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          security: { ...prev.security, twoFactor: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                    <Input 
                      id="passwordExpiry"
                      type="number"
                      value={settings.security.passwordExpiry}
                      onChange={(e) => 
                        setSettings(prev => ({
                          ...prev,
                          security: { ...prev.security, passwordExpiry: e.target.value }
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input 
                      id="sessionTimeout"
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => 
                        setSettings(prev => ({
                          ...prev,
                          security: { ...prev.security, sessionTimeout: e.target.value }
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">System Security</h4>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="encryption">Data Encryption</Label>
                    <Switch 
                      id="encryption"
                      checked={settings.security.encryption}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          security: { ...prev.security, encryption: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="firewall">Firewall Protection</Label>
                    <Switch 
                      id="firewall"
                      checked={settings.security.firewall}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          security: { ...prev.security, firewall: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Security Actions</Label>
                    <div className="flex gap-2 flex-col">
                      <Button variant="outline" size="sm">
                        View Security Logs
                      </Button>
                      <Button variant="outline" size="sm">
                        Security Scan
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => handleReset("Security")}>
                  Reset to Defaults
                </Button>
                <Button onClick={() => handleSave("Security")} className="bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Storage & File Management */}
        <TabsContent value="storage">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Folder className="h-5 w-5 text-purple-600" />
                Storage & File Management
              </CardTitle>
              <CardDescription>
                Configure storage settings, backups, and file management options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Backup Settings</h4>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoBackup">Automatic Backup</Label>
                    <Switch 
                      id="autoBackup"
                      checked={settings.storage.autoBackup}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          storage: { ...prev.storage, autoBackup: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="cloudSync">Cloud Synchronization</Label>
                    <Switch 
                      id="cloudSync"
                      checked={settings.storage.cloudSync}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          storage: { ...prev.storage, cloudSync: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="retentionPeriod">Data Retention (days)</Label>
                    <Input 
                      id="retentionPeriod"
                      type="number"
                      value={settings.storage.retentionPeriod}
                      onChange={(e) => 
                        setSettings(prev => ({
                          ...prev,
                          storage: { ...prev.storage, retentionPeriod: e.target.value }
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Storage Options</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="compressionLevel">Compression Level</Label>
                    <Select value={settings.storage.compressionLevel} onValueChange={(value) => 
                      setSettings(prev => ({
                        ...prev,
                        storage: { ...prev.storage, compressionLevel: value }
                      }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Storage Actions</Label>
                    <div className="flex gap-2 flex-col">
                      <Button variant="outline" size="sm">
                        Clean Temporary Files
                      </Button>
                      <Button variant="outline" size="sm">
                        Analyze Disk Usage
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => handleReset("Storage")}>
                  Reset to Defaults
                </Button>
                <Button onClick={() => handleSave("Storage")} className="bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Software & Updates */}
        <TabsContent value="updates">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-orange-600" />
                Software & Updates
              </CardTitle>
              <CardDescription>
                Manage system updates, software installations, and maintenance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Update Settings</h4>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoUpdate">Automatic Updates</Label>
                    <Switch 
                      id="autoUpdate"
                      checked={settings.updates.autoUpdate}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          updates: { ...prev.updates, autoUpdate: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="updateChannel">Update Channel</Label>
                    <Select value={settings.updates.updateChannel} onValueChange={(value) => 
                      setSettings(prev => ({
                        ...prev,
                        updates: { ...prev.updates, updateChannel: value }
                      }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stable">Stable</SelectItem>
                        <SelectItem value="beta">Beta</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoRestart">Auto-restart after updates</Label>
                    <Switch 
                      id="autoRestart"
                      checked={settings.updates.autoRestart}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          updates: { ...prev.updates, autoRestart: checked }
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Maintenance</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maintenanceWindow">Maintenance Window</Label>
                    <Input 
                      id="maintenanceWindow"
                      type="time"
                      value={settings.updates.maintenanceWindow}
                      onChange={(e) => 
                        setSettings(prev => ({
                          ...prev,
                          updates: { ...prev.updates, maintenanceWindow: e.target.value }
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Update Actions</Label>
                    <div className="flex gap-2 flex-col">
                      <Button variant="outline" size="sm">
                        Check for Updates
                      </Button>
                      <Button variant="outline" size="sm">
                        View Update History
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => handleReset("Updates")}>
                  Reset to Defaults
                </Button>
                <Button onClick={() => handleSave("Updates")} className="bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Power & Performance */}
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                Power & Performance
              </CardTitle>
              <CardDescription>
                Optimize system performance, power consumption, and resource usage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Power Management</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="powerMode">Power Mode</Label>
                    <Select value={settings.performance.powerMode} onValueChange={(value) => 
                      setSettings(prev => ({
                        ...prev,
                        performance: { ...prev.performance, powerMode: value }
                      }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="power-saver">Power Saver</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="performance">High Performance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sleepTimer">Sleep Timer (minutes)</Label>
                    <Input 
                      id="sleepTimer"
                      type="number"
                      value={settings.performance.sleepTimer}
                      onChange={(e) => 
                        setSettings(prev => ({
                          ...prev,
                          performance: { ...prev.performance, sleepTimer: e.target.value }
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Performance Optimization</h4>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="cpuOptimization">CPU Optimization</Label>
                    <Switch 
                      id="cpuOptimization"
                      checked={settings.performance.cpuOptimization}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          performance: { ...prev.performance, cpuOptimization: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="memoryOptimization">Memory Optimization</Label>
                    <Switch 
                      id="memoryOptimization"
                      checked={settings.performance.memoryOptimization}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          performance: { ...prev.performance, memoryOptimization: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Performance Actions</Label>
                    <div className="flex gap-2 flex-col">
                      <Button variant="outline" size="sm">
                        Performance Report
                      </Button>
                      <Button variant="outline" size="sm">
                        System Cleanup
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => handleReset("Performance")}>
                  Reset to Defaults
                </Button>
                <Button onClick={() => handleSave("Performance")} className="bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
