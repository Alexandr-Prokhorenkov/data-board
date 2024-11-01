import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUserApi, setCookie } from "../../api/apiEndpoints";
import { RegisterData, RegisterResponse, UserState } from "./userSliceTypes";


const initialState: UserState = {
  user: null,
  token: null,
  isLoading: false,
  isAuth: false,
  error: null,
};

export const registerUser = createAsyncThunk<RegisterResponse, RegisterData, { rejectValue: string }>("user/registerUser", async (data, { rejectWithValue }) => {
  try {
    const response: RegisterResponse = await registerUserApi(data);

    if (response.error_code !== 0) {
      return rejectWithValue(response.error_message);
    }

    const { token, username } = response.data;

    localStorage.setItem("refreshToken", String(token));
    setCookie("accessToken", String(token));

    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      localStorage.removeItem("refreshToken");
      document.cookie = "accessToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload.data.token; // Достаем токен из RegisterResponse
        state.user = action.payload.data.username;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || "Ошибка регистрации";
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
