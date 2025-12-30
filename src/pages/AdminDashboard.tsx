import { useState } from "react";
import { Users, UserCircle, FileText, AlertTriangle } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatCard } from "@/components/dashboard/StatCard";
import { CustomersTable } from "@/components/dashboard/CustomersTable";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { NoticesList } from "@/components/dashboard/NoticesList";
import { SummaryCard } from "@/components/dashboard/SummaryCard";

const sampleStats = {
  customers: 1242,
  agents: 38,
  policiesThisMonth: 112,
  claimsThisMonth: 14,
};

const sampleNotices = [
  { id: 1, title: "Policy renewal reminder sent", time: "2h ago" },
  { id: 2, title: "New agent joined: Priya R.", time: "1d ago" },
  { id: 3, title: "Scheduled downtime (Sat 02:00–03:00)", time: "3d ago" },
];

const sampleCustomers = [
  { id: 1, name: "Sita Verma", policy: "Health Plus", lastPayment: "2025-11-01" },
  { id: 2, name: "Arjun Rao", policy: "Car Shield", lastPayment: "2025-10-19" },
  { id: 3, name: "Maya Singh", policy: "Life Secure", lastPayment: "2025-09-30" },
];

const statCards = [
  { title: "Customers", value: sampleStats.customers, icon: Users, trend: { value: 12, isPositive: true } },
  { title: "Agents", value: sampleStats.agents, icon: UserCircle, trend: { value: 5, isPositive: true } },
  { title: "Policies (Month)", value: sampleStats.policiesThisMonth, icon: FileText, trend: { value: 8, isPositive: true } },
  { title: "Claims (Month)", value: sampleStats.claimsThisMonth, icon: AlertTriangle, trend: { value: 3, isPositive: false } },
];

export default function AdminDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient effect */}
      <div className="fixed inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <Sidebar 
  isOpen={menuOpen} 
  onClose={() => setMenuOpen(false)} 
  collapsed={collapsed} 
  setCollapsed={setCollapsed}
/>


      {/* Main content */}
      <div className={`transition-all duration-300 ${collapsed ? "lg:pl-20" : "lg:pl-64"}`}>

        <Header onMenuClick={() => setMenuOpen(true)} />

        <main className="p-4 lg:p-6 space-y-6">
          {/* Stats Grid */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat, index) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                trend={stat.trend}
                delay={index * 100}
              />
            ))}
          </section>

          {/* Content Grid */}
          <section className="grid lg:grid-cols-3 gap-6">
            {/* Left column - spans 2 on large screens */}
            <div className="lg:col-span-2 space-y-6">
              <CustomersTable customers={sampleCustomers} />
              <QuickActions />
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <NoticesList notices={sampleNotices} />
              <SummaryCard stats={sampleStats} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
