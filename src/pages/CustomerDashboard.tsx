import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Bell,
  User,
  KeyRound,
  LogOut,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/* ================= TYPES ================= */

type ClaimStatus =
  | "Submitted"
  | "Docs Pending"
  | "In Assessment"
  | "Processing"
  | "Approved";

type Claim = {
  id: string;
  submittedAt: string;
  status: ClaimStatus;
  hospital: string;
  policyNo: string;
  amountClaimed: number;
  daysOpen: number;
};

/* ================= MOCK DATA ================= */

const agent = {
  agentId: "AGT-1021",
  name: "Ramesh Kumar",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh",
};

const customer = {
  customerId: "CUST-100234",
  name: "Suresh Reddy",
  email: "suresh.reddy@gmail.com",
  phone: "9876543210",
  joinedOn: "2024-06-15",
};

const claim: Claim = {
  id: "CLM-1010",
  submittedAt: "2025-11-22",
  status: "Docs Pending",
  hospital: "Apollo Hospitals, Hyderabad",
  policyNo: "POL-2024-HPF-123",
  amountClaimed: 35000,
  daysOpen: 3,
};

/* ================= CUSTOMER DETAILS ================= */

const CustomerDetails = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Details</CardTitle>
        <CardDescription>Basic customer information</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Customer ID</p>
          <p className="font-medium">{customer.customerId}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Name</p>
          <p className="font-medium">{customer.name}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Email</p>
          <p className="font-medium">{customer.email}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Phone</p>
          <p className="font-medium">{customer.phone}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Joined On</p>
          <p className="font-medium">
            {new Date(customer.joinedOn).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

/* ================= CLAIM TRACKING ================= */

const stages: ClaimStatus[] = [
  "Submitted",
  "Docs Pending",
  "In Assessment",
  "Processing",
  "Approved",
];

const ClaimTracking = ({ claim }: { claim: Claim }) => {
  const currentIndex = stages.indexOf(claim.status);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Claim Tracking</CardTitle>
        <CardDescription>
          Claim ID: {claim.id} • Submitted: {claim.submittedAt}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-2 bg-primary transition-all"
            style={{
              width: `${((currentIndex + 1) / stages.length) * 100}%`,
            }}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {stages.map((stage, index) => (
            <div
              key={stage}
              className={`border rounded-lg p-3 text-center ${
                index < currentIndex
                  ? "border-primary bg-primary/10"
                  : index === currentIndex
                  ? "border-primary bg-primary/5"
                  : "border-muted bg-muted/30"
              }`}
            >
              <p className="text-sm font-medium">{stage}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Hospital</p>
            <p className="font-medium">{claim.hospital}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Policy Number</p>
            <p className="font-medium">{claim.policyNo}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Claim Amount</p>
            <p className="font-medium">
              ₹{claim.amountClaimed.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Days Open</p>
            <p className="font-medium">{claim.daysOpen} days</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

/* ================= DASHBOARD ================= */

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState<"dashboard" | "notices">("dashboard");

  const unreadNotices = 2;

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      navigate("/customer");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r shadow-sm">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={agent.avatar} />
            </Avatar>
            <div className="text-sm">
              <p className="text-gray-500">{agent.agentId}</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <Button
            variant={view === "dashboard" ? "secondary" : "ghost"}
            className="w-full justify-start gap-3"
            onClick={() => setView("dashboard")}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Button>

          <Button
            variant={view === "notices" ? "secondary" : "ghost"}
            className="w-full justify-start gap-3"
            onClick={() => setView("notices")}
          >
            <Bell className="h-5 w-5" />
            Notices
            {unreadNotices > 0 && (
              <Badge variant="destructive" className="ml-auto">
                {unreadNotices}
              </Badge>
            )}
          </Button>
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="h-16 bg-white border-b flex justify-between px-6 items-center">
          <div>
            <h1 className="text-xl font-bold">Customer Dashboard</h1>
            <p className="text-sm text-gray-600">
              Welcome back, {customer.name}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <Avatar>
                  <AvatarFallback>{customer.name[0]}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* CONTENT */}
        <main className="p-6 space-y-6">
          {view === "dashboard" && (
            <>
              <CustomerDetails />
              <ClaimTracking claim={claim} />
            </>
          )}

          {view === "notices" && (
            <Card>
              <CardContent className="p-6">
                Notices content remains unchanged.
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
