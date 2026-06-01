import axios from "axios";

const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") ??
  "https://malkat-dashboard.codlop.sa";

function getBaseURL(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return API_ORIGIN;
}

export const apiClient = axios.create({
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Accept-Language": "ar",
  },
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

apiClient.interceptors.request.use((config) => {
  config.baseURL = getBaseURL();
  return config;
});

export async function ensureCsrfCookie(): Promise<void> {
  await apiClient.get("/sanctum/csrf-cookie");
}
