import axios, { AxiosError } from "axios";

export const tryCatchMiddleware = async(callback: () => Promise<any>) => {
  try {
    const res = await callback();

    return res;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("Axios error:", axiosError.message);

      if (axiosError.response) {
        console.error({
          "status code:": axiosError.response.status,
          "response data:": axiosError.response.data,
        });
      }
    } else {
      console.error("Non-Axios error:", error.message);
    }
  }

  return { info: null, results: [] };
};
