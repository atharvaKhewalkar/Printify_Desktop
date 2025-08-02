import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Camera, 
  Shield, 
  Key,
  CreditCard,
  Bell
} from "lucide-react"

export function Profile() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Profile Settings
        </h1>
        <p className="text-muted-foreground">Manage your account details and preferences</p>
      </div>

      {/* Profile Header */}
      <Card className="gradient-card border-purple-200">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/api/placeholder/96/96" alt="Profile" />
                <AvatarFallback className="text-2xl gradient-primary text-white">
                  AM
                </AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 gradient-primary text-white"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">Alex Martinez</h2>
              <p className="text-muted-foreground">Print Shop Owner</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="secondary">Premium Account</Badge>
                <Badge variant="outline">Verified</Badge>
              </div>
            </div>
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
              className={isEditing ? "" : "gradient-primary text-white"}
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input 
                    defaultValue="Alex" 
                    disabled={!isEditing}
                    className={isEditing ? "" : "bg-muted"}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input 
                    defaultValue="Martinez" 
                    disabled={!isEditing}
                    className={isEditing ? "" : "bg-muted"}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="flex gap-2">
                  <Input 
                    defaultValue="alex.martinez@printflow.com" 
                    disabled={!isEditing}
                    className={isEditing ? "" : "bg-muted"}
                  />
                  <Badge variant="secondary" className="self-center">
                    <Mail className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input 
                    defaultValue="+1 (555) 123-4567" 
                    disabled={!isEditing}
                    className={isEditing ? "" : "bg-muted"}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Input 
                    type="date" 
                    defaultValue="1985-03-15" 
                    disabled={!isEditing}
                    className={isEditing ? "" : "bg-muted"}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea 
                  placeholder="Tell us about yourself..."
                  defaultValue="Owner of PrintFlow Copy Center. 15+ years experience in print services and customer satisfaction."
                  disabled={!isEditing}
                  className={isEditing ? "" : "bg-muted"}
                />
              </div>
            </CardContent>
          </Card>

          {/* Business Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Business Name</Label>
                <Input 
                  defaultValue="PrintFlow Copy Center" 
                  disabled={!isEditing}
                  className={isEditing ? "" : "bg-muted"}
                />
              </div>

              <div className="space-y-2">
                <Label>Business Address</Label>
                <Input 
                  defaultValue="123 Main Street, Suite 100" 
                  disabled={!isEditing}
                  className={isEditing ? "" : "bg-muted"}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input 
                    defaultValue="New York" 
                    disabled={!isEditing}
                    className={isEditing ? "" : "bg-muted"}
                  />
                </div>
                <div className="space-y-2">
                  <Label>ZIP Code</Label>
                  <Input 
                    defaultValue="10001" 
                    disabled={!isEditing}
                    className={isEditing ? "" : "bg-muted"}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Business Phone</Label>
                <Input 
                  defaultValue="+1 (555) 987-6543" 
                  disabled={!isEditing}
                  className={isEditing ? "" : "bg-muted"}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Settings Sidebar */}
        <div className="space-y-6">
          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Account Type</span>
                <Badge className="gradient-primary text-white">Premium</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Member Since</span>
                <span className="text-sm text-muted-foreground">Mar 2022</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Login</span>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>
              <Separator />
              <Button variant="outline" className="w-full">
                <CreditCard className="w-4 h-4 mr-2" />
                Manage Subscription
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-600" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Key className="w-4 h-4 mr-2" />
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Two-Factor Auth
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="w-4 h-4 mr-2" />
                Login Notifications
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="gradient-card border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg">This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-bold">127</div>
                <div className="text-sm text-muted-foreground">Jobs Processed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">$2,847</div>
                <div className="text-sm text-muted-foreground">Total Earnings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">98.5%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Save Changes */}
      {isEditing && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel Changes
          </Button>
          <Button className="gradient-primary text-white" onClick={() => setIsEditing(false)}>
            Save Changes
          </Button>
        </div>
      )}
    </div>
  )
}