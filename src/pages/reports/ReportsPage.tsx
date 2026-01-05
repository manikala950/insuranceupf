import { useEffect, useState } from "react";
import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Users,
  UserCheck,
  FileText,
  IndianRupee,
  Download,
} from "lucide-react";

import CustomersList from "../Customerlist";
import Agents from "../agentlist";

const API = import.meta.env.VITE_API_URL;

/* ================= TYPES ================= */

interface Summary {
  totalCustomers: number;
  totalAgents: number;
  totalClaims: number;
  totalEarnings: number;
}

interface AgentReport {
  agentId: string;
  agentName: string;
  customers: number;
  earnings: number;
}

interface CustomerReport {
  customerId: string;
  customerName: string;
  agentName: string;
  amount: number;
}

/* ================= COMPONENT ================= */

export default function ReportsPage() {
  const [summary, setSummary] = useState<Summary>({
    totalCustomers: 0,
    totalAgents: 0,
    totalClaims: 0,
    totalEarnings: 0,
  });

  const [agents, setAgents] = useState<AgentReport[]>([]);
  const [customers, setCustomers] = useState<CustomerReport[]>([]);

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      const [summaryRes, agentRes, customerRes] = await Promise.all([
        axios.get(`${API}/api/reports/summary`),
        axios.get(`${API}/api/reports/agents`),
        axios.get(`${API}/api/reports/customers`),
      ]);

      setSummary(summaryRes.data);
      setAgents(agentRes.data);
      setCustomers(customerRes.data);
    } catch (err) {
      console.error("Failed to load reports", err);
    }
  };

  /* ================= EXPORT CSV ================= */

  const exportCSV = () => {
    if (!customers.length) return;

    const header = "Customer ID,Customer Name,Agent Name,Amount\n";

    const rows = customers
      .map(
        (c) =>
          `${c.customerId},${c.customerName},${c.agentName},${c.amount}`
      )
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "customer-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  /* ================= UI ================= */

  return (
    <div className="pt-20 px-6 pb-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reports</h1>
        <Button variant="outline" onClick={exportCSV}>
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* KPI SECTION */}
      <div className="grid md:grid-cols-4 gap-4 ml-20">
        <Kpi title="Customers" value={summary.totalCustomers} icon={<Users />} />
        <Kpi title="Agents" value={summary.totalAgents} icon={<UserCheck />} />
        <Kpi title="Claims" value={summary.totalClaims} icon={<FileText />} />
        <Kpi
          title="Earnings"
          value={`₹${summary.totalEarnings}`}
          icon={<IndianRupee />}
        />
      </div>

      {/* CUSTOMER & AGENT LISTS */}
      <div className="ml-6">
  <CustomersList />
</div>

      <Agents hideSidebar />


      {/* AGENT REPORT */}
      <Card>
        <CardHeader>
          <CardTitle>Agent-wise Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Agent</th>
                <th className="text-center p-2">Customers</th>
                <th className="text-right p-2">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((a) => (
                <tr key={a.agentId} className="border-b">
                  <td className="p-2">{a.agentName}</td>
                  <td className="p-2 text-center">{a.customers}</td>
                  <td className="p-2 text-right">₹{a.earnings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* CUSTOMER REPORT */}
      <Card>
        <CardHeader>
          <CardTitle>Customer-wise Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Customer</th>
                <th className="text-left p-2">Agent</th>
                <th className="text-right p-2">Amount</th>
                <th className="text-center p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.customerId} className="border-b">
                  <td className="p-2">{c.customerName}</td>
                  <td className="p-2">{c.agentName}</td>
                  <td className="p-2 text-right">₹{c.amount}</td>
                  <td className="p-2 text-center">
                    <Badge
                      className={
                        c.amount > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200"
                      }
                    >
                      {c.amount > 0 ? "PAID" : "NO PAYMENT"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

/* ================= KPI COMPONENT ================= */

function Kpi({
  title,
  value,
  icon,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="flex justify-between p-4">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="text-primary">{icon}</div>
      </CardContent>
    </Card>
  );
}
