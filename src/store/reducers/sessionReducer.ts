import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  startSessionApi,
  endSessionApi,
  getActiveSessionApi,
  getStatsApi,
  Session,
  Stats,
} from "@services/sessionService";

interface SessionState {
  activeSession: Session | null;
  stats: Stats | null;
  isLoading: boolean;
  error: string;
}

const initialState: SessionState = {
  activeSession: null,
  stats: null,
  isLoading: false,
  error: "",
};

export const startSessionAction = createAsyncThunk(
  "session/start",
  async (_, { rejectWithValue }) => {
    try {
      return await startSessionApi();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to start");
    }
  },
);

export const endSessionAction = createAsyncThunk(
  "session/end",
  async (_, { rejectWithValue }) => {
    try {
      return await endSessionApi();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to end");
    }
  },
);

export const getActiveSessionAction = createAsyncThunk(
  "session/getActive",
  async (_, { rejectWithValue }) => {
    try {
      return await getActiveSessionApi();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch");
    }
  },
);

export const getStatsAction = createAsyncThunk(
  "session/getStats",
  async (_, { rejectWithValue }) => {
    try {
      return await getStatsApi();
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch stats",
      );
    }
  },
);

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    clearSessionError(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startSessionAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        startSessionAction.fulfilled,
        (state, action: PayloadAction<Session>) => {
          state.isLoading = false;
          state.activeSession = action.payload;
        },
      )
      .addCase(startSessionAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(endSessionAction.fulfilled, (state) => {
        state.activeSession = null;
      })
      .addCase(getActiveSessionAction.fulfilled, (state, action) => {
        state.activeSession = action.payload;
      })
      .addCase(
        getStatsAction.fulfilled,
        (state, action: PayloadAction<Stats>) => {
          state.stats = action.payload;
        },
      );
  },
});

export const { clearSessionError } = sessionSlice.actions;
export default sessionSlice.reducer;
