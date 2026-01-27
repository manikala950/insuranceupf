import { useState } from "react";
import axios from "axios";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSettings() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const ADMIN_API = "http://localhost:8080/api/admin";

  // 🔐 CHANGE PASSWORD
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const username = localStorage.getItem("adminUsername");

      await axios.post(`${ADMIN_API}/change-password`, {
        username,
        newPassword,
        confirmPassword,
      });

      setMessage("Password changed successfully");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Error changing password");
    }
  };

  // 👤 UPDATE PROFILE (OPTIONAL BACKEND)
  const handleProfileUpdate = async () => {
    try {
      const username = localStorage.getItem("adminUsername");

      await axios.put(`${ADMIN_API}/update-profile`, {
        username,
        name,
        email,
      });

      setMessage("Profile updated successfully");
    } catch (error: any) {
      setMessage("Error updating profile");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />

      <Sidebar
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className={`transition-all duration-300 ${collapsed ? "lg:pl-20" : "lg:pl-64"}`}>
        <Header onMenuClick={() => setMenuOpen(true)} />

        <main className="p-4 lg:p-6 space-y-6 max-w-5xl mx-auto">
          <h1 className="text-2xl font-semibold">Admin Settings</h1>

          {message && <p className="text-sm text-primary">{message}</p>}

          {/* 👤 PROFILE */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-medium">Profile Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>

              <Button className="mt-4" onClick={handleProfileUpdate}>
                Update Profile
              </Button>
            </CardContent>
          </Card>

          {/* 🔐 SECURITY */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-medium">Security</h2>

              <div className="space-y-3">
                <div>
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button variant="outline" onClick={handleChangePassword}>
                Change Password
              </Button>
            </CardContent>
          </Card>

          {/* ⚙️ SYSTEM */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-medium">System Controls</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button className="w-full">Manage Agents</Button>
                <Button className="w-full">Manage Customers</Button>
                <Button className="w-full">System Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
