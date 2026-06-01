import axios from "axios";

import { emitAuthUnauthorized } from "@/src/lib/authUnauthorized";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Accept-Language": "ar",
  },
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 419) {
      emitAuthUnauthorized();
    }
    return Promise.reject(error);
  },
);

export async function ensureCsrfCookie(): Promise<void> {
  await apiClient.get("/sanctum/csrf-cookie");
}
