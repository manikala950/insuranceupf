import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  FileChartColumn,
  Users,
  ShieldCheck,
  AlertTriangle,
  BarChart3,
} from "lucide-react";

export default function Reports() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Sample data (can be replaced with API later)
  const reportStats = [
    { title: "Total Customers", value: 1242, icon: Users },
    { title: "Active Policies", value: 892, icon: ShieldCheck },
    { title: "Total Agents", value: 38, icon: FileChartColumn },
    { title: "Claims Filed", value: 142, icon: AlertTriangle },
  ];

  const policyReport = [
    { id: 1, policy: "Health Plus", customers: 420, revenue: "₹6,20,000" },
    { id: 2, policy: "Car Shield", customers: 310, revenue: "₹4,80,000" },
    { id: 3, policy: "Life Secure", customers: 205, revenue: "₹3,10,000" },
  ];

  const claimReport = [
    { id: "CLM-1001", customer: "Ravi Kumar", type: "Health", amount: "₹25,000", status: "Pending" },
    { id: "CLM-1002", customer: "Neha Gupta", type: "Life", amount: "₹1,20,000", status: "Approved" },
    { id: "CLM-1003", customer: "Arjun Patel", type: "Car", amount: "₹35,000", status: "Rejected" },
  ];

  return (
    <div className="min-h-screen bg-background">
     

      <div className="lg:pl-64">
        {/* <Header onMenuClick={() => setMenuOpen(true)} /> */}

        <main className="p-6 space-y-6">
          {/* Page Title */}
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-primary" />
            Reports Overview
          </h1>
          <p className="text-muted-foreground -mt-2">
            Insights into policies, agents, customers, and claims.
          </p>

          {/* Report Stat Cards */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {reportStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-semibold">{stat.title}</CardTitle>
                    <Icon className="w-5 h-5 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </CardContent>
                </Card>
              );
            })}
          </section>

          {/* Policy Report Table */}
          <Card>
            <CardHeader>
              <CardTitle>Policy Performance Report</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Policy Name</TableHead>
                    <TableHead>Customers</TableHead>
                    <TableHead>Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {policyReport.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{p.policy}</TableCell>
                      <TableCell>{p.customers}</TableCell>
                      <TableCell>{p.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Claims Report Table */}
          <Card>
            <CardHeader>
              <CardTitle>Claims Summary Report</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {claimReport.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>{c.id}</TableCell>
                      <TableCell>{c.customer}</TableCell>
                      <TableCell>{c.type}</TableCell>
                      <TableCell>{c.amount}</TableCell>
                      <TableCell>{c.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}