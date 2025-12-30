import { Bell, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Notice {
  id: number;
  title: string;
  time: string;
}

interface NoticesListProps {
  notices: Notice[];
}

export function NoticesList({ notices }: NoticesListProps) {
  return (
    <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: "400ms" }}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-foreground">Recent Notices</h4>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
          View All
        </Button>
      </div>

      <ul className="space-y-3">
        {notices.map((notice, index) => (
          <li 
            key={notice.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
            style={{ animationDelay: `${500 + index * 100}ms` }}
          >
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Bell className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {notice.title}
              </p>
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {notice.time}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
