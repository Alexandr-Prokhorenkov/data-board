import axios, { AxiosResponse } from "axios";
import { fetchData } from "./apiUtils";
import { BarChartResponse, LineChartResponse } from "../services/slices/chartsSliceTypes";
import { DateResponse, DeleteResponse, RecordData, TableResponse } from "../services/slices/tableSliceTypes";
import { RegisterData, RegisterResponse } from "../services/slices/userSliceTypes";

export const registerUserApi = async (data: RegisterData): Promise<RegisterResponse> => {
  try {
    const response: AxiosResponse<RegisterResponse> = await axios.post("http://localhost:5000/login", data, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    const jsonResponse = response.data;

    if (jsonResponse.error_code === 0) {
      return jsonResponse;
    } else {
      return Promise.reject(jsonResponse);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTableData = (token: string): Promise<TableResponse> => {
  return fetchData<TableResponse>("http://localhost:5000/data", token);
};

export const fetchLineChartData = (token: string): Promise<LineChartResponse> => {
  return fetchData<LineChartResponse>("http://localhost:5000/lineChartData", token);
};

export const fetchBarChartData = (token: string): Promise<BarChartResponse> => {
  return fetchData<BarChartResponse>("http://localhost:5000/barChartData", token);
};

export const addRecordApi = async (token: string, recordData: RecordData): Promise<DateResponse> => {
  try {
    const response: AxiosResponse<DateResponse> = await axios.post("http://localhost:5000/add", recordData, {
      headers: {
        "x-auth": token,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при добавлении записи:", error);
    throw error;
  }
};

export const deleteRecordApi = async (token: string, id: string): Promise<DeleteResponse> => {
  try {
    const response: AxiosResponse<DeleteResponse> = await axios.delete(`http://localhost:5000/delete/${id}`, {
      headers: {
        "x-auth": token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при удалении записи:", error);
    throw error;
  }
};

export const updateRecordApi = async (token: string, id: string, recordData: RecordData): Promise<DateResponse> => {
  try {
    const response: AxiosResponse<DateResponse> = await axios.post(`http://localhost:5000/edit/${id}`, recordData, {
      headers: {
        "x-auth": token,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении записи:", error);
    throw error;
  }
};

export function setCookie(name: string, value: string, options: Record<string, any> = {}): void {
  options = {
    path: "/",
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (const optionKey in options) {
    updatedCookie += "; " + optionKey;
    const optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.*+?^${}()|[\]\\])/g, "\\$1") + "=([^;]*)"));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
