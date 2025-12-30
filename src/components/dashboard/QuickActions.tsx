import { useNavigate } from "react-router-dom";
import { UserPlus, Users, Bell, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  { icon: UserPlus, label: "Add Agent", path: "/add-agent" },
  { icon: Users, label: "Add Customer", path: "/add-customer" },
  { icon: Bell, label: "Create Notice", path: "/notices" },
  { icon: FileText, label: "Generate Report", path: "/reports" },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: "300ms" }}>
      <h4 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h4>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Button
            key={action.path}
            variant="secondary"
            onClick={() => navigate(action.path)}
            className="h-auto py-4 flex-col gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/30 border border-transparent transition-all group"
            style={{ animationDelay: `${400 + index * 50}ms` }}
          >
            <action.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
