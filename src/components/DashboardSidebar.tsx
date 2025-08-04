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
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/assets/logo.svg";

const DashboardSidebar = ({ isOpen, onClose }) => {
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
    <>
      {/* Overlay for mobile */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-30 md:hidden",
          isOpen ? "block" : "hidden"
        )}
        onClick={onClose}
      ></div>

      <aside
        className={cn(
          "w-64 bg-[#171717] border-r border-border h-screen fixed left-0 top-0 flex flex-col z-40 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        <div className="p-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Logo" className="h-12" />
          </div>
          <button onClick={onClose} className="md:hidden p-1">
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        <div className="flex-1 px-4 flex flex-col justify-between overflow-y-auto scrollbar-hide">
          {/* Menu items */}
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200",
                  item.active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
          {/* Misc items */}
          <div className="space-y-1 pb-4">
            <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-4">
              Misc
            </h3>
            {miscItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-colors text-muted-foreground hover:text-foreground hover:bg-accent/50"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </div>
            ))}
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
    </>
  );
};

export default DashboardSidebar;
