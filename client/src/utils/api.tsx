import axios, { AxiosResponse } from "axios";
import { LineChartResponse, DateResponse, DeleteResponse, RecordData, RegisterData, RegisterResponse, TableResponse, BarChartResponse } from "../types/types";
import { BarChartProps } from "@mui/x-charts";

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

export const getTableData = async (token: string): Promise<TableResponse> => {
  try {
    const response: AxiosResponse<TableResponse> = await axios.get("http://localhost:5000/data", {
      headers: {
        "x-auth": token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching table data:", error);
    throw error;
  }
};


export const fetchLineChartData = async (token: string): Promise<LineChartResponse> => {
  try {
    const response: AxiosResponse<LineChartResponse> = await axios.get("http://localhost:5000/lineChartData", {
      headers: {
        "x-auth": token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching table data:", error);
    throw error;
  }
};

export const fetchBarChartData = async (token: string): Promise<BarChartResponse> => {
  try {
    const response: AxiosResponse<BarChartResponse> = await axios.get("http://localhost:5000/barChartData", {
      headers: {
        "x-auth": token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching table data:", error);
    throw error;
  }
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
