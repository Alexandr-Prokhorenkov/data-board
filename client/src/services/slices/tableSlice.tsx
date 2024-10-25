import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTableData, addRecordApi, deleteRecordApi, updateRecordApi } from "../../utils/api";
import { DateResponse, DeleteResponse, TableRecord, TableResponse } from "../../types/types";

interface TableState {
  data: TableRecord[];
  isLoading: boolean;
  error: string | null;
}

interface GetTablePayload {
  token: string;
}

interface AddRecordPayload {
  token: string;
  recordData: TableRecord;
}

interface DeleteRecordPayload {
  token: string;
  id: string;
}

interface UpdateRecordPayload {
  token: string;
  id: string;
  recordData: TableRecord;
}

export const getTable = createAsyncThunk<TableRecord[], GetTablePayload, { rejectValue: string }>("table/getTable", async ({ token }, { rejectWithValue }) => {
  try {
    const response: TableResponse = await getTableData(token);
    if (response.error_code === 0) {
      return response.data;
    } else {
      return rejectWithValue(response.error_message);
    }
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const addNewRecord = createAsyncThunk<TableRecord, AddRecordPayload, { rejectValue: string }>("table/addNewRecord", async ({ token, recordData }, { rejectWithValue }) => {
  try {
    const response: DateResponse = await addRecordApi(token, recordData);
    if (response.error_code === 0) {
      return response.data;
    } else {
      return rejectWithValue(response.error_message);
    }
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deleteRecord = createAsyncThunk<string, DeleteRecordPayload, { rejectValue: string }>("table/deleteRecord", async ({ token, id }, { rejectWithValue }) => {
  try {
    const response: DeleteResponse = await deleteRecordApi(token, id);
    if (response.error_code === 0) {
      return id;
    } else {
      return rejectWithValue(response.error_message);
    }
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const updateRecord = createAsyncThunk<TableRecord, UpdateRecordPayload, { rejectValue: string }>("table/updateRecord", async ({ token, id, recordData }, { rejectWithValue }) => {
  try {
    const response: DateResponse = await updateRecordApi(token, id, recordData);
    if (response.error_code === 0) {
      return response.data;
    } else {
      return rejectWithValue(response.error_message);
    }
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const initialState: TableState = {
  data: [],
  isLoading: false,
  error: null,
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTable.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTable.fulfilled, (state, action: PayloadAction<TableRecord[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getTable.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || "Ошибка при загрузке данных";
      })
      .addCase(addNewRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewRecord.fulfilled, (state, action: PayloadAction<TableRecord>) => {
        state.isLoading = false;
        state.data.push(action.payload);
      })
      .addCase(addNewRecord.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || "Ошибка при добавлении записи";
      })
      .addCase(deleteRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteRecord.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.data = state.data.filter((record) => record.id !== action.payload);
      })
      .addCase(deleteRecord.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || "Ошибка при удалении записи";
      })
      .addCase(updateRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateRecord.fulfilled, (state, action: PayloadAction<TableRecord>) => {
        state.isLoading = false;
        state.data = state.data.map((record) => (record.id === action.payload.id ? action.payload : record));
      })
      .addCase(updateRecord.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || "Ошибка при обновлении записи";
      });
  },
});

export default tableSlice.reducer;
