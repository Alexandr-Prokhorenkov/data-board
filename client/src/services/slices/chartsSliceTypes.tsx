export interface ChartState {
  lineChartData: LineChartData;
  barChartData: BarChartData;
  isLoading: boolean;
  error: string | null;
}

export interface LineChartData {
  uData: number[];
  pData: number[];
  sData: number[];
  xLabels: string[];
}

interface BarSeriesData {
  data: number[];
}

export interface BarChartData {
  data: BarSeriesData[];
  xAxisData: XAxisConfig[];
}

interface XAxisConfig {
  scaleType: "band";
  data: string[];
}

export interface LineChartResponse {
  error_code: number;
  error_message: string;
  data: LineChartData;
  profiling?: string;
  timings?: null;
}

export interface BarChartResponse {
  error_code: number;
  error_message: string;
  data: BarChartData;
  profiling?: string;
  timings?: null;
}

export interface GetChartPayload {
  token: string;
}
