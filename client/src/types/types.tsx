export interface RegisterData {
  username: string;
  password: string;
}

export interface RegisterResponse {
  error_code: number;
  error_message: string;
  data: {
    token: string;
    username: string;
  };
  profiling?: string;
  timings?: null;
}

export interface DeleteResponse {
  error_code: number;
  error_message: string;
  profiling: string;
  timings: null;
}

export interface TableRecord {
  id: string;
  documentStatus: string;
  employeeNumber: string;
  documentType: string;
  documentName: string;
  companySignatureName: string;
  employeeSignatureName: string;
  employeeSigDate: string;
  companySigDate: string;
}

export interface TableResponse {
  error_code: number;
  error_message: string;
  data: TableRecord[];
  profiling?: string;
  timings?: null;
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

export interface DateResponse {
  error_code: number;
  error_message: string;
  data: TableRecord;
  profiling?: string;
  timings?: null;
}

export interface RecordData {
  [key: string]: any;
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

interface XAxisConfig {
  scaleType: "band";
  data: string[];
}

export interface BarChartData {
  data: BarSeriesData[];
  xAxisData: XAxisConfig[];
}
