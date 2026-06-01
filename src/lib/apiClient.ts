import axios from "axios";

const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") ??
  "https://malkat-dashboard.codlop.sa";

export const apiClient = axios.create({
  baseURL: API_ORIGIN,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Accept-Language": "ar",
  },
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

export async function ensureCsrfCookie(): Promise<void> {
  await apiClient.get("/sanctum/csrf-cookie");
}
