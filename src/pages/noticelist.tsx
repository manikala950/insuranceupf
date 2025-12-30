import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Bell, Clock } from "lucide-react";

interface Notice {
  id: number;
  text: string;
  time: string;
}

export default function Notice() {
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const [notices, setNotices] = useState<Notice[]>([]);

  // -------------------------
  // GET all notices
  // -------------------------
  const loadNotices = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/notice/list`);
      const data = await res.json();
      setNotices(data.reverse()); // newest first
    } catch {
      console.error("Error loading notices");
    }
  };

  useEffect(() => {
    loadNotices();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className={`transition-all duration-300 ${collapsed ? "lg:pl-20" : "lg:pl-64"}`}>
        <main className="p-6 max-w-3xl mx-auto">

          {/* Page Title */}
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-6">
            <Bell className="w-7 h-7 text-primary" />
            Notifications
          </h1>

          {/* Notification Feed */}
          {notices.length === 0 ? (
            <p className="text-center text-muted-foreground mt-10">No notifications</p>
          ) : (
            <div className="space-y-4">
              {notices.map((n) => (
                <div
                  key={n.id}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition"
                >
                  {/* Notification Icon */}
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>

                  {/* Message */}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{n.text}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Clock className="w-3 h-3" />
                      {n.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
