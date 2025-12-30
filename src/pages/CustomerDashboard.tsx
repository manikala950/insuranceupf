import React, { useMemo, useState } from "react";
import {
  FileText,
  ChevronRight,
  LayoutDashboard,
  Bell,
  Settings,
  KeyRound,
  LogOut,
  PhoneCall,
  AlertTriangle,
  Upload,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

/* ================= TYPES ================= */

type AgentInfo = {
  agentId: string;
  name: string;
  addedOn: string;
};

type ClaimStatus =
  | "Submitted"
  | "Docs Pending"
  | "In Assessment"
  | "Processing"
  | "Approved";

type Claim = {
  id: string;
  submittedAt: string;
  product: string;
  status: ClaimStatus;
  amountClaimed: number;
  amountApproved?: number;
  daysOpen: number;
};

type Notice = {
  id: string;
  message: string;
  action?: string;
  severity: "info" | "warning" | "success";
};

type SupportRequest = {
  id: string;
  subject: string;
  status: "Open" | "In Progress" | "Resolved";
  description: string;
};

/* ================= MOCK DATA ================= */

const agent: AgentInfo = {
  agentId: "AGT-1021",
  name: "Ramesh Kumar",
  addedOn: "2025-01-15",
};

const claims: Claim[] = [
  {
    id: "CLM-1010",
    submittedAt: "2025-11-22",
    product: "Health Plus Family",
    status: "Docs Pending",
    amountClaimed: 35000,
    daysOpen: 3,
  },
  {
    id: "CLM-1007",
    submittedAt: "2025-10-19",
    product: "UP Life Care",
    status: "In Assessment",
    amountClaimed: 120000,
    daysOpen: 12,
  },
  {
    id: "CLM-1003",
    submittedAt: "2025-09-30",
    product: "Cancer Protect",
    status: "Approved",
    amountClaimed: 500000,
    amountApproved: 450000,
    daysOpen: 26,
  },
];

const notices: Notice[] = [
  {
    id: "N1",
    message: "Upload discharge summary for Claim CLM-1010",
    action: "Upload Document",
    severity: "warning",
  },
  {
    id: "N2",
    message: "Claim CLM-1003 approved – payment in progress",
    severity: "success",
  },
  {
    id: "N3",
    message: "Policy expiring in 15 days",
    action: "Renew Policy",
    severity: "info",
  },
];

const supportRequests: SupportRequest[] = [
  {
    id: "S1",
    subject: "Claim CLM-1010 missing documents",
    status: "Open",
    description:
      "The uploaded documents for CLM-1010 are incomplete. Please upload discharge summary.",
  },
  {
    id: "S2",
    subject: "Policy renewal query",
    status: "In Progress",
    description: "Query regarding upcoming renewal for policy P-102.",
  },
  {
    id: "S3",
    subject: "Payment delay issue",
    status: "Resolved",
    description: "The payment for claim CLM-1003 has been processed successfully.",
  },
];

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
        <CardDescription>Claim ID: {claim.id}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-2 bg-primary"
            style={{
              width: `${((currentIndex + 1) / stages.length) * 100}%`,
            }}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {stages.map((s, i) => (
            <div
              key={s}
              className={`border rounded p-2 text-center text-xs ${
                i <= currentIndex ? "border-primary bg-primary/5" : "border-muted"
              }`}
            >
              {s}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

/* ================= CUSTOMER DASHBOARD ================= */

const CustomerDashboard: React.FC = () => {
  const [view, setView] = useState<"dashboard" | "claims" | "notices">(
    "dashboard"
  );
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [selectedSupport, setSelectedSupport] = useState<SupportRequest | null>(null);
  const [q, setQ] = useState("");

  const totals = useMemo(() => {
    const total = claims.length;
    const approved = claims.filter(c => c.status === "Approved").length;
    return { total, approved, open: total - approved };
  }, []);

  const filteredClaims = claims.filter(
    c =>
      c.id.toLowerCase().includes(q.toLowerCase()) ||
      c.product.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* SIDEBAR */}
      <aside className="w-64 bg-background border-r flex flex-col">
        <div className="p-4 border-b">
          <p className="font-semibold">Agent Details</p>
          <p className="text-sm">ID: {agent.agentId}</p>
          <p className="text-sm">{agent.name}</p>
          <p className="text-sm">
            Added: {new Date(agent.addedOn).toLocaleDateString()}
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Button
            variant={view === "dashboard" ? "secondary" : "ghost"}
            className="w-full justify-start gap-2"
            onClick={() => setView("dashboard")}
          >
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Button>

          <Button
            variant={view === "claims" ? "secondary" : "ghost"}
            className="w-full justify-start gap-2"
            onClick={() => setView("claims")}
          >
            <FileText className="h-4 w-4" /> My Claims
          </Button>

          <Button
            variant={view === "notices" ? "secondary" : "ghost"}
            className="w-full justify-start gap-2"
            onClick={() => setView("notices")}
          >
            <AlertTriangle className="h-4 w-4" /> Notices
          </Button>
        </nav>

        <div className="p-4 border-t">
          <Button variant="destructive" className="w-full gap-2">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1">
        <header className="h-16 bg-background border-b flex items-center justify-between px-6">
          <h1 className="font-semibold text-lg">Customer Dashboard</h1>
          <div className="flex gap-2">
            <Bell className="h-5 w-5" />
            <Settings className="h-5 w-5" />
            <KeyRound className="h-5 w-5" />
          </div>
        </header>

        <main className="p-6 space-y-6">
          {/* DASHBOARD */}
          {view === "dashboard" && (
            <>
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent>Total Claims: {totals.total}</CardContent>
                </Card>
                <Card>
                  <CardContent>Open Claims: {totals.open}</CardContent>
                </Card>
                <Card>
                  <CardContent>Approved: {totals.approved}</CardContent>
                </Card>
              </div>

              {/* SUPPORT REQUESTS */}
              <Card>
                <CardHeader>
                  <CardTitle>Open Support Requests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {supportRequests.map(sr => (
                    <div
                      key={sr.id}
                      className="flex justify-between items-center p-2 border rounded cursor-pointer"
                      onClick={() => setSelectedSupport(sr)}
                    >
                      <span>{sr.subject}</span>
                      <Badge
                        className={`${
                          sr.status === "Open"
                            ? "bg-amber-100 text-amber-800"
                            : sr.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {sr.status}
                      </Badge>
                    </div>
                  ))}

                  {selectedSupport && (
                    <Card className="mt-2">
                      <CardHeader>
                        <CardTitle>{selectedSupport.subject}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Status: {selectedSupport.status}</p>
                        <p>{selectedSupport.description}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedSupport(null)}
                        >
                          Close
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>

              <ClaimTracking claim={claims[0]} />
            </>
          )}

          {/* MY CLAIMS */}
          {view === "claims" && !selectedClaim && (
            <>
              <Input
                placeholder="Search claims..."
                value={q}
                onChange={e => setQ(e.target.value)}
                className="max-w-sm mb-4"
              />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClaims.map(c => (
                    <TableRow key={c.id}>
                      <TableCell>{c.id}</TableCell>
                      <TableCell>{c.product}</TableCell>
                      <TableCell>
                        <Badge>{c.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setSelectedClaim(c)}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}

          {/* CLAIM DETAILS */}
          {view === "claims" && selectedClaim && (
            <>
              <Button
                variant="ghost"
                onClick={() => setSelectedClaim(null)}
                className="mb-4"
              >
                ← Back to Claims
              </Button>

              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>Claim Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>ID: {selectedClaim.id}</p>
                  <p>Product: {selectedClaim.product}</p>
                  <p>Status: {selectedClaim.status}</p>
                  <p>Amount Claimed: ₹{selectedClaim.amountClaimed}</p>
                  {selectedClaim.amountApproved && (
                    <p>Amount Approved: ₹{selectedClaim.amountApproved}</p>
                  )}
                </CardContent>
              </Card>

              <ClaimTracking claim={selectedClaim} />
            </>
          )}

          {/* NOTICES */}
          {view === "notices" && (
            <div className="space-y-3">
              {notices.map(n => (
                <Card key={n.id}>
                  <CardContent className="flex justify-between items-center">
                    <span>{n.message}</span>
                    {n.action && (
                      <Button size="sm" className="gap-1">
                        <Upload className="h-4 w-4" /> {n.action}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
