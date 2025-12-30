import { LayoutDashboard, Users, FileText, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  collapsed: boolean;
}

export function AgentSidebar({ collapsed }: Props) {
  const navigate = useNavigate();

  const menu = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/agent-dashboard" },
    { label: "Customers", icon: Users, path: "/customers" },
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
            navigate("/login");
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
