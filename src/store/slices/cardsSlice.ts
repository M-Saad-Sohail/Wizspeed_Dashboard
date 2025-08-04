import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "@/integrations/supabase/client";

export interface CardData {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  color: string;
}

interface CardsState {
  cards: CardData[];
  isLoading: boolean;
  isAddingCard: boolean;
  error: string | null;
}

const initialState: CardsState = {
  cards: [],
  isLoading: false,
  isAddingCard: false,
  error: null,
};

// Async thunks
export const fetchCards = createAsyncThunk("cards/fetchCards", async () => {
  const { data, error } = await supabase
    .from("cards")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
});

export const addCardAsync = createAsyncThunk(
  "cards/addCard",
  async (cardData: Omit<CardData, "id">) => {
    const { data, error } = await supabase
      .from("cards")
      .insert([cardData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cards = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch cards";
      })
      .addCase(addCardAsync.pending, (state) => {
        state.isAddingCard = true;
        state.error = null;
      })
      .addCase(addCardAsync.fulfilled, (state, action) => {
        state.isAddingCard = false;
        state.cards.unshift(action.payload);
      })
      .addCase(addCardAsync.rejected, (state, action) => {
        state.isAddingCard = false;
        state.error = action.error.message || "Failed to add card";
      });
  },
});

export default cardsSlice.reducer;
