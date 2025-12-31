import { useState, useEffect, ChangeEvent } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

/* ================= TYPES ================= */

interface Notice {
  id: number;
  text: string;
  time: string;
}

const API_URL = import.meta.env.VITE_API_URL;

/* ================= COMPONENT ================= */

export default function Notice() {
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);

  const [newNotice, setNewNotice] = useState("");
  const [notices, setNotices] = useState<Notice[]>([]);

  /* ================= LOAD NOTICES ================= */
  const loadNotices = async () => {
    try {
      const res = await fetch(`${API_URL}/api/notice/list`);
      const data: Notice[] = await res.json();
      setNotices([...data].reverse()); // newest first
    } catch (error) {
      console.error("Failed to load notices", error);
    }
  };

  useEffect(() => {
    loadNotices();
  }, []);

  /* ================= ADD NOTICE ================= */
  const handleAdd = async () => {
    if (!newNotice.trim()) return;

    try {
      const res = await fetch(`${API_URL}/api/notice/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newNotice }),
      });

      if (!res.ok) {
        alert("❌ Failed to add notice");
        return;
      }

      alert("✅ Notice added successfully");
      setNewNotice("");
      loadNotices();
    } catch (error) {
      console.error("Failed to add notice", error);
      alert("❌ Server error");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={`transition-all duration-300 ${
          collapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        <main className="p-6 space-y-8">
          <h1 className="text-3xl font-bold">Notices</h1>

          {/* ================= CREATE NOTICE ================= */}
          <Card className="max-w-3xl border border-primary/10 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Create Notice
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <textarea
                className="border rounded w-full p-3 bg-background/50 h-28 resize-none
                focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Write your notice message..."
                value={newNotice}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setNewNotice(e.target.value)
                }
              />

              <Button onClick={handleAdd} className="w-full h-11 text-md">
                Post Notice
              </Button>
            </CardContent>
          </Card>

          {/* ================= NOTICE LIST ================= */}
          <Card className="max-w-3xl border border-primary/10 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                All Notices
              </CardTitle>
            </CardHeader>

            <CardContent>
              {notices.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  No notices available
                </p>
              ) : (
                <ul className="space-y-3 mt-3">
                  {notices.map((n) => (
                    <li
                      key={n.id}
                      className="border rounded-xl bg-background/40 backdrop-blur-sm
                      p-4 shadow-sm flex justify-between gap-4"
                    >
                      <span className="text-sm">{n.text}</span>
                      <small className="text-primary font-medium whitespace-nowrap">
                        {n.time}
                      </small>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
