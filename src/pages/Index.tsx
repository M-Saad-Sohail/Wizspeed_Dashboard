import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardCards from "@/components/DashboardCards";
import TopServices from "@/components/TopServices";
import LatestTickets from "@/components/LatestTickets";
import { cn } from "@/lib/utils";

const Index = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        )}
      >
        <DashboardHeader onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="p-4 md:p-6 md:ml-64 bg-[#121212]">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Dashboard
            </h1>
          </div>

          <DashboardCards />
          <div className="lg:col-span-2">
            <TopServices />
          </div>
          <div className="lg:col-span-1">
            <LatestTickets />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
