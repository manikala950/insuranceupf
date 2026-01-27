import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

/* UI Components */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

/* Icons */
import {
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
  Bell,
  Settings,
  Key,
  ClipboardList,
  CalendarClock,
  TrendingUp,
  UploadCloud,
  PhoneCall,
  MailCheck,
  Plus,
  Filter,
  Search,
  Activity,
  UserPlus,
} from "lucide-react";

/* ===================== SIDEBAR ===================== */

function AgentSidebar({ collapsed }: { collapsed: boolean }) {
  const navigate = useNavigate();
  const storedAgent = localStorage.getItem("agent");
  const agent = storedAgent ? JSON.parse(storedAgent) : null;


  const menu = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/agent/dashboard" },
    { label: "Customers", icon: Users, path: "/customerslist" },
    { label: "Claims", icon: FileText, path: "/claims" },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-slate-900 text-white transition-all
      ${collapsed ? "w-20" : "w-64"}`}
    >
      <div className="p-5 text-xl font-bold border-b border-slate-700">
        {collapsed ? "AG" : "Agent Panel"}
      </div>

      <nav className="p-3 space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex items-center gap-3 w-full p-3 rounded hover:bg-slate-800"
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
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

/* ===================== DASHBOARD ===================== */

const AgentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed] = useState(false);

  /* -------- STATS -------- */
  const stats = [
    { label: "Active Cases", value: "24", icon: FileText, color: "bg-blue-500" },
    { label: "Pending Docs", value: "7", icon: ClipboardList, color: "bg-amber-500" },
    { label: "Today's Tasks", value: "11", icon: CalendarClock, color: "bg-emerald-500" },
    { label: "Satisfaction", value: "94%", icon: Users, color: "bg-purple-500" },
  ];

  /* -------- QUICK ACTIONS -------- */
  const quickActions = [
    {
      label: "New Claim",
      description: "Create new claim",
      icon: Plus,
      color: "bg-emerald-500",
      action: () => navigate("/upload-claim"),
    },
    {
      label: "Upload Documents",
      description: "Submit claim files",
      icon: UploadCloud,
      color: "bg-blue-500",
      action: () => {},
    },
    {
      label: "Call Customer",
      description: "Pending follow-ups",
      icon: PhoneCall,
      color: "bg-amber-500",
      action: () => {},
    },
    {
      label: "Send Email",
      description: "Customer updates",
      icon: MailCheck,
      color: "bg-purple-500",
      action: () => {},
    },
  ];

  return (
    <div className="min-h-screen bg-muted/20">
      <AgentSidebar collapsed={collapsed} />

      <div className={`transition-all ${collapsed ? "ml-20" : "ml-64"} p-6`}>
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Agent Dashboard</h1>
            <p className="text-muted-foreground">Welcome back!</p>
          </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>

              {/* Agent Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer border rounded-lg px-3 py-1.5 hover:bg-muted">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-cyan-500 text-white">
                        AG
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Agent</span>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem onClick={() => navigate("/agent/settings")}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>

            <DropdownMenuItem
              className="text-red-600"
              onClick={() => {
                localStorage.clear();
                navigate("/agent");
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="flex gap-3 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9 w-64" placeholder="Search..." />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button onClick={() => navigate("/add-customer")}>
            <UserPlus className="mr-2 h-4 w-4" />
            New Customer
          </Button>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label}>
                <CardContent className="p-6 flex justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <p className="text-3xl font-bold">{s.value}</p>
                  </div>
                  <div className={`${s.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ================= PERFORMANCE ================= */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
            <CardDescription>Track your performance</CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <div>
              <div className="flex justify-between text-sm">
                <span>Closure Rate</span>
                <span className="text-red-600">85% / 90%</span>
              </div>
              <Progress value={85} />
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span>Avg Resolution Time</span>
                <span className="text-green-600">72% / 65%</span>
              </div>
              <Progress value={72} />
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span>Customer Satisfaction</span>
                <span className="text-red-600">94% / 95%</span>
              </div>
              <Progress value={94} />
            </div>
          </CardContent>
        </Card>

        {/* ================= QUICK ACTIONS ================= */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.label}
                  variant="outline"
                  className="h-auto py-6 flex flex-col items-center gap-2"
                  onClick={action.action}
                >
                  <div className={`${action.color} p-3 rounded-lg`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium">{action.label}</span>
                  <span className="text-xs text-muted-foreground text-center">
                    {action.description}
                  </span>
                </Button>
              );
            })}
          </CardContent>
          </Card>
                  {/* ================= CUSTOMER MANAGEMENT ================= */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-cyan-500" />
              Customer Management
            </CardTitle>
            <CardDescription>
              Manage your customer relationships
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Total Customers */}
            <div className="flex justify-between items-center p-4 rounded-lg bg-muted">
              <div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">42</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full border">
                +3 this week
              </span>
            </div>

            {/* Policies */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-50">
                <p className="text-sm text-blue-600">Active Policies</p>
                <p className="text-xl font-bold">38</p>
              </div>

              <div className="p-4 rounded-lg bg-green-50">
                <p className="text-sm text-green-600">Renewals Due</p>
                <p className="text-xl font-bold">5</p>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search Customer" />
            </div>

            <Button className="w-full bg-cyan-500 hover:bg-cyan-600">
              Add New Customer
            </Button>
          </CardContent>
        </Card>

        {/* ================= TODAY'S PRIORITIES ================= */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-cyan-500" />
              Today's Priorities
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Priority 1 */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-red-100">
                <PhoneCall className="h-4 w-4 text-red-600" />
              </div>

              <div className="flex-1">
                <p className="font-medium">Call Sanjana Rao</p>
                <p className="text-xs text-muted-foreground">
                  Discharge summary follow-up
                </p>
              </div>

              <span className="text-xs px-2 py-1 rounded-full bg-red-500 text-white">
                Now
              </span>
            </div>

            {/* Priority 2 */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <UploadCloud className="h-4 w-4 text-blue-600" />
              </div>

              <div className="flex-1">
                <p className="font-medium">Upload Vikram's reports</p>
                <p className="text-xs text-muted-foreground">
                  Medical assessment files
                </p>
              </div>

              <span className="text-xs px-2 py-1 rounded-full border">
                10 AM
              </span>
            </div>

            {/* Priority 3 */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-100">
                <MailCheck className="h-4 w-4 text-green-600" />
              </div>

              <div className="flex-1">
                <p className="font-medium">Email Neha Gupta</p>
                <p className="text-xs text-muted-foreground">
                  Bank details confirmation
                </p>
              </div>

              <span className="text-xs px-2 py-1 rounded-full border">
                2 PM
              </span>
            </div>

            <Button variant="outline" className="w-full">
              View Full Schedule
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentDashboard;
