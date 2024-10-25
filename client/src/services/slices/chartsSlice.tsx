import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BarChartData, LineChartResponse, LineChartData, BarChartResponse } from "../../types/types";
import { fetchBarChartData, fetchLineChartData } from "../../utils/api";

interface GetChartPayload {
  token: string;
}

export const getLineChartData = createAsyncThunk<LineChartData, GetChartPayload, { rejectValue: string }>("charts/getLine", async ({ token }, { rejectWithValue }) => {
  try {
    const response: LineChartResponse = await fetchLineChartData(token);
    if (response.error_code === 0) {
      return response.data;
    } else {
      return rejectWithValue(response.error_message);
    }
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const getBarChartData = createAsyncThunk<BarChartData, GetChartPayload, { rejectValue: string }>("charts/getBar", async ({ token }, { rejectWithValue }) => {
  try {
    const response: BarChartResponse = await fetchBarChartData(token);
    if (response.error_code === 0) {
      return response.data;
    } else {
      return rejectWithValue(response.error_message);
    }
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

interface ChartState {
  lineChartData: LineChartData;
  barChartData: BarChartData;
  isLoading: boolean;
  error: string | null;
}

const initialState: ChartState = {
  lineChartData: {
    uData: [],
    pData: [],
    sData: [],
    xLabels: [],
  },
  barChartData: {
    data: [],
    xAxisData: [],
  },
  isLoading: false,
  error: null,
};

const chartsSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLineChartData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLineChartData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lineChartData = action.payload;
      })
      .addCase(getLineChartData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error fetching line chart data";
      })
      .addCase(getBarChartData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBarChartData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.barChartData = action.payload;
      })
      .addCase(getBarChartData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error fetching bar chart data";
      });
  },
});

export default chartsSlice.reducer;
