import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "@/integrations/supabase/client";

export interface ServiceData {
  id: string;
  name: string;
  color: string;
  progress: number;
  formsSubmitted: number;
}

interface ServicesState {
  services: ServiceData[];
  isLoading: boolean;
  isAddingService: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  isLoading: false,
  error: null,
  isAddingService: false,
};

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }
);

export const addServiceAsync = createAsyncThunk(
  "services/addService",
  async (serviceData: Omit<ServiceData, "id">) => {
    const { data, error } = await supabase
      .from("services")
      .insert([serviceData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch services";
      })
      .addCase(addServiceAsync.pending, (state) => {
        state.isAddingService = true;
        state.error = null;
      })
      .addCase(addServiceAsync.fulfilled, (state, action) => {
        state.isAddingService = false;
        state.services.unshift(action.payload);
      })
      .addCase(addServiceAsync.rejected, (state, action) => {
        state.isAddingService = false;
        state.error = action.error.message || "Failed to add service";
      });
  },
});

export default servicesSlice.reducer;
