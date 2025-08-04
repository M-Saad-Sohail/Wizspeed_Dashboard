import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardCards from "@/components/DashboardCards";
import TopServices from "@/components/TopServices";
import LatestTickets from "@/components/LatestTickets";

const Index = () => {
  return (
    <div className="min-h-screen bg-dashboard-bg">
      <DashboardSidebar />
      <DashboardHeader />
      <div className="ml-64 bg-[#121212]">
        <main className="p-6">
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
