import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  fetchTickets,
  addTicketAsync,
  deleteTicketAsync,
  updateTicketAsync,
  TicketData,
} from "@/store/slices/ticketsSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  ChevronDown,
  ChevronsUpDown,
  MoreHorizontal,
} from "lucide-react";

const defaultNewTicketState: Omit<TicketData, "id"> = {
  customer: "",
  issue: "",
  status: "To do",
  project: "",
  date: new Date().toISOString().split("T")[0],
};

const StatusIndicator = ({ status }: { status: string }) => {
  const statusConfig = {
    "To do": "bg-cyan-500",
    Completed: "bg-green-500",
    Cancelled: "bg-red-500",
  };
  const color = statusConfig[status] || "bg-neutral-500";

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2.5 h-2.5 rounded-full ${color}`}></div>
      <span className="text-sm text-neutral-300">{status}</span>
    </div>
  );
};

const LatestTickets = () => {
  const dispatch = useAppDispatch();
  const { tickets, isLoading, isAddingTicket, error } = useAppSelector(
    (state) => state.tickets
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState<Partial<TicketData>>(
    defaultNewTicketState
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const handleAdd = () => {
    setIsEditing(false);
    setCurrentTicket(defaultNewTicketState);
    setIsDialogOpen(true);
  };

  const handleEdit = (ticket: TicketData) => {
    setIsEditing(true);
    setCurrentTicket(ticket);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const actionToDispatch = isEditing
      ? updateTicketAsync(currentTicket as TicketData)
      : addTicketAsync(currentTicket as Omit<TicketData, "id">);

    dispatch(actionToDispatch)
      .unwrap()
      .then(() => {
        setIsDialogOpen(false);
      })
      .catch((err) => {
        console.error("Failed to save ticket:", err);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: "status", value: string) => {
    setCurrentTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteTicket = (ticketId: string) => {
    dispatch(deleteTicketAsync(ticketId));
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-neutral-400">
        Loading tickets...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">Error: {error}</div>;
  }

  return (
    <Card className="bg-[#1C1C1C] border border-neutral-800 rounded-2xl text-white">
      <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-neutral-800">
        <CardTitle className="text-xl font-semibold">Latest Tickets</CardTitle>
        <div className="flex items-center gap-3">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleAdd}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-neutral-900 border-neutral-800 text-white">
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? "Edit Ticket" : "Add New Ticket"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="customer">Customer Name</Label>
                  <Input
                    name="customer"
                    value={currentTicket.customer}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="issue">Issue Description</Label>
                  <Input
                    name="issue"
                    value={currentTicket.issue}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="project">Project Name</Label>
                  <Input
                    name="project"
                    value={currentTicket.project}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={currentTicket.status}
                    onValueChange={(value) =>
                      handleSelectChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="To do">To do</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    name="date"
                    type="date"
                    value={currentTicket.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="ghost">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={isAddingTicket}>
                    {isAddingTicket
                      ? "Saving..."
                      : isEditing
                      ? "Update Ticket"
                      : "Add Ticket"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Select defaultValue="projects">
            <SelectTrigger className="w-[180px] bg-neutral-800 border-neutral-700 text-neutral-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 border-neutral-700 text-neutral-300">
              <SelectItem value="projects">Projects</SelectItem>
              <SelectItem value="clients">Clients</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <Input
              placeholder="Search here"
              className="pl-10 bg-neutral-800 border-neutral-700"
            />
          </div>
          <Button
            variant="outline"
            className="bg-neutral-800 border-neutral-700 text-neutral-300"
          >
            Filters <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-neutral-800">
                {[
                  "TICKET ID",
                  "TICKET DETAILS",
                  "CLIENT/PROJECT NAME",
                  "DATE",
                  "STATUS",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-xs font-medium text-neutral-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center gap-1 cursor-pointer">
                      {header}
                      <ChevronsUpDown className="h-3 w-3" />
                    </div>
                  </th>
                ))}
                <th className="px-6 py-4 text-xs font-medium text-neutral-500 uppercase tracking-wider text-right">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-300">
                    Ticket {ticket.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">
                    {ticket.issue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`https://i.pravatar.cc/40?u=${ticket.customer}`}
                        />
                        <AvatarFallback>
                          {ticket.customer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {ticket.customer}
                        </div>
                        <div className="text-xs text-neutral-400">
                          {ticket.project}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                    {ticket.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusIndicator status={ticket.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-neutral-400 hover:text-white data-[state=open]:bg-neutral-700"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-neutral-800 border-neutral-700 text-neutral-300"
                      >
                        <DropdownMenuItem
                          onSelect={() => handleEdit(ticket)}
                          className="hover:bg-neutral-700 focus:bg-neutral-700"
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => handleDeleteTicket(ticket.id)}
                          className="text-red-500 hover:!text-red-500 hover:!bg-red-500/10 focus:!bg-red-500/10"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>

      <div className="flex items-center justify-between p-6 border-t border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-400">
            Showing 1 to {tickets.length} of {tickets.length} entries
          </span>
          <Select defaultValue="5">
            <SelectTrigger className="w-[70px] bg-neutral-800 border-neutral-700 text-neutral-300 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 border-neutral-700 text-neutral-300">
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            className="bg-neutral-800 border-neutral-700 h-8 px-3"
          >
            Previous
          </Button>
          {[1, 2, 3, 4, 5].map((page) => (
            <Button
              key={page}
              variant={page === 1 ? "default" : "ghost"}
              size="icon"
              className={`h-8 w-8 ${
                page === 1
                  ? "bg-orange-600 hover:bg-orange-700"
                  : "hover:bg-neutral-700"
              }`}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            className="bg-neutral-800 border-neutral-700 h-8 px-3"
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LatestTickets;
