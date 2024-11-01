import { RootState } from "../store/store";

export const selectData = (state: RootState) => state.table.data;
export const selectlineChartData = (state: RootState) => state.charts.lineChartData;
export const selectBarChartData = (state: RootState) => state.charts.barChartData;
export const selectloadingUser = (state: RootState) => state.user.isLoading;
