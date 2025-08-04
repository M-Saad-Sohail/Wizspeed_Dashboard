import {
  LayoutDashboard,
  Users,
  FolderOpen,
  Link,
  Ticket,
  FileText,
  HelpCircle,
  LogOut,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/assets/logo.svg"; // SVG Import

const DashboardSidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Users, label: "Clients" },
    { icon: FolderOpen, label: "Projects" },
    { icon: Link, label: "Leads" },
    { icon: Ticket, label: "Tickets" },
    { icon: FileText, label: "Reports" },
    { icon: Settings, label: "Workspace" },
  ];

  const miscItems = [{ icon: HelpCircle, label: "Support" }];

  return (
    <aside className="w-64 bg-[#171717] border-r border-border h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo Section */}
      <div className="p-6">
        <div className="flex justify-center items-center gap-2">
          <img src={Logo} alt="Logo" className="h-16" />
        </div>
      </div>

      {/* Main Content Section with Grow */}
      <div className="flex-1 px-4 flex flex-col justify-between overflow-y-auto scrollbar-hide">
        <div>
          {/* Navigation */}
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200",
                  item.active
                    ? "bg-primary/10 text-primary border-l-2 border-r-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <div className="relative z-10 flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </div>
              </div>
            ))}
          </nav>

          {/* Misc Section */}
          <div className="mt-4">
            <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Misc
            </h3>
            <nav className="space-y-1">
              {miscItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-colors text-muted-foreground hover:text-foreground hover:bg-accent/50"
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Footer Section - Always at Bottom */}
        <div className="space-y-1 pb-4">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-colors text-muted-foreground hover:text-foreground hover:bg-accent/50">
            <HelpCircle className="h-5 w-5" />
            Knowledge
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-colors text-muted-foreground hover:text-foreground hover:bg-accent/50">
            <LogOut className="h-5 w-5" />
            Logout
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
