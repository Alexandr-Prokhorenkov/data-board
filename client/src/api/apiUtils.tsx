import axios, { AxiosResponse } from "axios";


export async function fetchData<T>(url: string, token: string): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.get(url, {
      headers: {
        "x-auth": token,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
}
