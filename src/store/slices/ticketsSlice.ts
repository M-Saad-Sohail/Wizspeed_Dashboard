import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "@/integrations/supabase/client";

export interface TicketData {
  id: string;
  customer: string;
  issue: string;
  status: string;
  project: string;
  date: string;
}

interface TicketsState {
  tickets: TicketData[];
  isLoading: boolean;
  isAddingTicket: boolean;
  error: string | null;
}

const initialState: TicketsState = {
  tickets: [],
  isLoading: false,
  isAddingTicket: false,
  error: null,
};

// Async thunks
export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async () => {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }
);

export const addTicketAsync = createAsyncThunk(
  "tickets/addTicket",
  async (ticketData: Omit<TicketData, "id">) => {
    const { data, error } = await supabase
      .from("tickets")
      .insert([ticketData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
);

export const updateTicketAsync = createAsyncThunk(
  "tickets/updateTicket",
  async (ticketData: TicketData) => {
    const { data, error } = await supabase
      .from("tickets")
      .update(ticketData)
      .eq("id", ticketData.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
);

export const deleteTicketAsync = createAsyncThunk(
  "tickets/deleteTicket",
  async (ticketId: string) => {
    const { error } = await supabase
      .from("tickets")
      .delete()
      .eq("id", ticketId);

    if (error) throw error;
    return ticketId;
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch tickets";
      })
      .addCase(addTicketAsync.pending, (state) => {
        state.isAddingTicket = true;
        state.error = null;
      })
      .addCase(addTicketAsync.fulfilled, (state, action) => {
        state.isAddingTicket = false;
        state.tickets.unshift(action.payload);
      })
      .addCase(addTicketAsync.rejected, (state, action) => {
        state.isAddingTicket = false;
        state.error = action.error.message || "Failed to add ticket";
      })
      .addCase(updateTicketAsync.pending, (state) => {
        state.isAddingTicket = true;
        state.error = null;
      })
      .addCase(updateTicketAsync.fulfilled, (state, action) => {
        state.isAddingTicket = false;
        const index = state.tickets.findIndex(
          (ticket) => ticket.id === action.payload.id
        );
        if (index !== -1) {
          state.tickets[index] = action.payload;
        }
      })
      .addCase(updateTicketAsync.rejected, (state, action) => {
        state.isAddingTicket = false;
        state.error = action.error.message || "Failed to update ticket";
      })
      .addCase(deleteTicketAsync.pending, (state) => {
        // state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTicketAsync.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.tickets = state.tickets.filter(
          (ticket) => ticket.id !== action.payload
        );
      })
      .addCase(deleteTicketAsync.rejected, (state, action) => {
        // state.isLoading = false;
        state.error = action.error.message || "Failed to delete ticket";
      });
  },
});

export default ticketsSlice.reducer;
