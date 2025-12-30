import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Customer {
  id: number;
  name: string;
  policy: string;
  lastPayment: string;
}

interface CustomersTableProps {
  customers: Customer[];
}

const policyColors: Record<string, string> = {
  "Health Plus": "bg-success/10 text-success border-success/20",
  "Car Shield": "bg-info/10 text-info border-info/20",
  "Life Secure": "bg-warning/10 text-warning border-warning/20",
};

export function CustomersTable({ customers }: CustomersTableProps) {
  return (
    <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: "200ms" }}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-foreground">Recent Customers</h4>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
          View All
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Name
              </th>
              <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Policy
              </th>
              <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">
                Last Payment
              </th>
              <th className="text-right py-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr 
                key={customer.id} 
                className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <td className="py-3 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">
                        {customer.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <span className="font-medium text-foreground">{customer.name}</span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${policyColors[customer.policy] || "bg-muted text-muted-foreground"}`}>
                    {customer.policy}
                  </span>
                </td>
                <td className="py-3 px-2 text-muted-foreground hidden sm:table-cell">
                  {customer.lastPayment}
                </td>
                <td className="py-3 px-2 text-right">
                  <Button variant="neon" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
