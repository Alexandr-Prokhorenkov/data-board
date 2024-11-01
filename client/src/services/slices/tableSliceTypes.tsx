export interface TableState {
  data: TableRecord[];
  isLoading: boolean;
  error: string | null;
}

export interface GetTablePayload {
  token: string;
}

export interface AddRecordPayload {
  token: string;
  recordData: TableRecord;
}

export interface DeleteRecordPayload {
  token: string;
  id: string;
}

export interface UpdateRecordPayload {
  token: string;
  id: string;
  recordData: TableRecord;
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

export interface DateResponse {
  error_code: number;
  error_message: string;
  data: TableRecord;
  profiling?: string;
  timings?: null;
}

export interface DeleteResponse {
  error_code: number;
  error_message: string;
  profiling: string;
  timings: null;
}

export interface RecordData {
  [key: string]: any;
}

