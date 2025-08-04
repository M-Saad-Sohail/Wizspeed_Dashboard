import { Search, Bell, ChevronDown, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardHeader = () => {
  return (
    <header className="bg-[#171717] border-b border-border px-6 py-4 ml-64">
      <div className="flex items-center justify-between">
        {/* Search Bar - Now starts from the left */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search here..."
              className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Right Side Icons and User Profile */}
        <div className="flex items-center gap-2">
          {/* Chat/Messages Icon */}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full border border-neutral-700 bg-transparent text-neutral-400 hover:bg-neutral-800 hover:text-white"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>

          {/* Notifications Icon */}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full border border-neutral-700 bg-transparent text-neutral-400 hover:bg-neutral-800 hover:text-white"
          >
            <Bell className="h-5 w-5" />
          </Button>

          {/* Separator (Optional but good for spacing) */}
          <div className="h-6 w-px bg-neutral-800 mx-2"></div>

          {/* User Profile Dropdown */}
          <button className="flex items-center gap-3 p-1.5 rounded-full hover:bg-neutral-800 transition-colors border border-neutral-700">
            <Avatar className="h-8 w-8">
              {/* Replace with your actual user image source */}
              <AvatarImage src="https://i.pravatar.cc/40?u=johnwick" />
              <AvatarFallback className="bg-orange-500 text-white text-sm">
                JW
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-white pr-1">
              John Wick
            </span>
            <ChevronDown className="h-4 w-4 text-neutral-500 mr-1" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
