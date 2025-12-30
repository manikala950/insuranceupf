import { Users, MapPin, FileText, AlertTriangle, LucideIcon } from "lucide-react";

interface SummaryStat {
  title: string;
  value: number;
  icon: LucideIcon;
}

interface SummaryCardProps {
  stats: {
    customers: number;
    agents: number;
    policiesThisMonth: number;
    claimsThisMonth: number;
  };
}

export function SummaryCard({ stats }: SummaryCardProps) {
  const summaryStats: SummaryStat[] = [
    { title: "Total Customers", value: stats.customers, icon: Users },
    { title: "Active Agents", value: stats.agents, icon: MapPin },
    { title: "Policies This Month", value: stats.policiesThisMonth, icon: FileText },
    { title: "Claims This Month", value: stats.claimsThisMonth, icon: AlertTriangle },
  ];

  return (
    <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: "500ms" }}>
      <h4 className="text-lg font-semibold text-foreground mb-4">Overall Summary</h4>
      <div className="grid grid-cols-2 gap-4">
        {summaryStats.map((stat, index) => (
          <div 
            key={stat.title}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
          >
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 group-hover:from-primary/30 group-hover:to-accent/20 transition-colors">
              <stat.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.title}</p>
              <p className="text-lg font-bold text-foreground">{stat.value.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
