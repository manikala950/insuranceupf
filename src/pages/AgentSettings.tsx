import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* UI */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

/* Icons */
import {
  Settings,
  Bell,
  LogOut,
  User,
  Mail,
  Phone,
  Users,
  ArrowLeft,
} from "lucide-react";

/* ===================== SIDEBAR ===================== */

function AgentSidebar({ collapsed }: { collapsed: boolean }) {
  const navigate = useNavigate();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-slate-900 text-white transition-all
      ${collapsed ? "w-20" : "w-64"}`}
    >
      <div className="p-5 text-xl font-bold border-b border-slate-700">
        {collapsed ? "AG" : "Agent Panel"}
      </div>

      <nav className="p-3 space-y-1">
        <button
          onClick={() => navigate("/agent/dashboard")}
          className="flex items-center gap-3 w-full p-3 rounded hover:bg-slate-800"
        >
          <ArrowLeft className="h-5 w-5" />
          {!collapsed && <span>Back to Dashboard</span>}
        </button>
      </nav>

      <div className="absolute bottom-4 w-full px-3">
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/agent");
          }}
          className="flex items-center gap-3 w-full p-3 rounded hover:bg-red-600"
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

/* ===================== SETTINGS PAGE ===================== */

const AgentSettings: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed] = useState(false);

  return (
    <div className="min-h-screen bg-muted/20">
      <AgentSidebar collapsed={collapsed} />

      <div className={`transition-all ${collapsed ? "ml-20" : "ml-64"} p-6`}>
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Agent Settings</h1>
            <p className="text-muted-foreground">
              Manage your profile and preferences
            </p>
          </div>

          <Button variant="outline" onClick={() => navigate("/agent/dashboard")}>
            Back
          </Button>
        </div>

        {/* ================= PROFILE ================= */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-cyan-500" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Update your personal details
            </CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input placeholder="Agent Name" />
            </div>

            <div>
              <Label>Email</Label>
              <Input placeholder="agent@email.com" />
            </div>

            <div>
              <Label>Phone</Label>
              <Input placeholder="+91 9XXXXXXXXX" />
            </div>

            <div>
              <Label>Assigned Region</Label>
              <Input placeholder="Hyderabad" />
            </div>

            <Button className="md:col-span-2 bg-cyan-500 hover:bg-cyan-600">
              Update Profile
            </Button>
          </CardContent>
        </Card>

        {/* ================= NOTIFICATIONS ================= */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-cyan-500" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Control how you receive alerts
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>Email Notifications</span>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>SMS Alerts</span>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Customer Updates</span>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* ================= COMMISSION INFO ================= */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-cyan-500" />
              Commission & Work Info
            </CardTitle>
            <CardDescription>
              Read-only information
            </CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground">
                Commission Rate
              </p>
              <p className="text-xl font-bold">12%</p>
            </div>

            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground">
                Active Customers
              </p>
              <p className="text-xl font-bold">42</p>
            </div>

            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground">
                Status
              </p>
              <p className="text-xl font-bold text-green-600">
                Active
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentSettings;
