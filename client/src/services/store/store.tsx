import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import tableSlice from "../slices/tableSlice";
import chartsSlice from "../slices/chartsSlice";

export const rootReducer = combineReducers({
  user: userSlice,
  table: tableSlice,
  charts: chartsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
