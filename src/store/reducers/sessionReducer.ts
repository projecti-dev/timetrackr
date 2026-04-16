import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  addEntryApi,
  getEntriesApi,
  deleteEntryApi,
  getStatsApi,
  Session,
  Stats,
} from "@services/sessionService";

interface SessionState {
  entries: Session[];
  stats: Stats | null;
  isLoading: boolean;
  error: string;
}

const initialState: SessionState = {
  entries: [],
  stats: null,
  isLoading: false,
  error: "",
};

export const addEntryAction = createAsyncThunk(
  "session/addEntry",
  async (
    payload: { date: string; startTime: string; endTime: string },
    { rejectWithValue },
  ) => {
    try {
      return await addEntryApi(
        payload.date,
        payload.startTime,
        payload.endTime,
      );
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to save entry",
      );
    }
  },
);

export const getEntriesAction = createAsyncThunk(
  "session/getEntries",
  async (_, { rejectWithValue }) => {
    try {
      return await getEntriesApi();
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load entries",
      );
    }
  },
);

export const deleteEntryAction = createAsyncThunk(
  "session/deleteEntry",
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteEntryApi(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete");
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
        err.response?.data?.message || "Failed to load stats",
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
      .addCase(addEntryAction.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(
        addEntryAction.fulfilled,
        (state, action: PayloadAction<Session>) => {
          state.isLoading = false;
          state.entries.unshift(action.payload);
        },
      )
      .addCase(addEntryAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(
        getEntriesAction.fulfilled,
        (state, action: PayloadAction<Session[]>) => {
          state.entries = action.payload;
        },
      )
      .addCase(
        deleteEntryAction.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.entries = state.entries.filter((e) => e.id !== action.payload);
        },
      )
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
