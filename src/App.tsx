import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

// Non-lazy pages
import CustomersList from "./pages/Customerlist";
import Reports from "./pages/reports/ReportsPage";
import UploadClaim from "./pages/UploadClaim";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerDetails from "./pages/customers/CustomerDetails";

// Lazy pages
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Services = React.lazy(() => import("./pages/Services"));
const Process = React.lazy(() => import("./pages/Process"));
const Contact = React.lazy(() => import("./pages/Contact"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Login = React.lazy(() => import("./pages/Login"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const AgentDashboard = React.lazy(() => import("./pages/AgentDashboard"));
const AddAgent = React.lazy(() => import("./pages/AddAgent"));
const AddCustomer = React.lazy(() => import("./pages/AddCustomer"));
const EditCustomer = React.lazy(() => import("./pages/customers/EditCustomer"));
const Claims = React.lazy(() => import("./pages/Claims"));
const Agents = React.lazy(() => import("./pages/agentlist"));
const Notice = React.lazy(() => import("./pages/notices"));
const NoticesList = React.lazy(() => import("./pages/noticelist"));

const queryClient = new QueryClient();

/* ================= LAYOUT ================= */
const Layout = () => {
  const location = useLocation();

  // 🔥 BASE ROUTES ONLY
  const hideLayoutRoutes = [
    "/admin",
    "/agent",
    "/customer",
    "/customers",
    "/customerslist",
    "/add-customer",
    "/add-agent",
    "/agentslist",
    "/reports",
    "/claims",
    "/notices",
    "/noticeslist",
    "/upload-claim",
  ];

  // ✅ MATCH /customers/edit/:id & /customers/view/:id
  const hideLayout = hideLayoutRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navigation />}

      <main className="flex-grow">
        <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
          <Routes>

            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/process" element={<Process />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />

            {/* Dashboards */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/agent" element={<AgentDashboard />} />
            <Route path="/customer" element={<CustomerDashboard />} />

            {/* Customers */}
            <Route path="/customerslist" element={<CustomersList />} />
            <Route path="/customers/view/:id" element={<CustomerDetails />} />
            <Route path="/customers/edit/:id" element={<EditCustomer />} />
            <Route path="/add-customer" element={<AddCustomer />} />

            {/* Agents */}
            <Route path="/agentslist" element={<Agents />} />
            <Route path="/add-agent" element={<AddAgent />} />

            {/* Others */}
            <Route path="/reports" element={<Reports />} />
            <Route path="/claims" element={<Claims />} />
            <Route path="/notices" element={<Notice />} />
            <Route path="/noticeslist" element={<NoticesList />} />
            <Route path="/upload-claim" element={<UploadClaim />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </Suspense>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
};

/* ================= APP ROOT ================= */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <Layout />
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
