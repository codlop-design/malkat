import axios from "axios";

import { authEvents } from "@/src/features/auth/lib/authEvents";
import { authDebug } from "@/src/features/auth/lib/authDebug";

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

apiClient.interceptors.request.use((config) => {
  authDebug("api", "request", {
    method: config.method?.toUpperCase(),
    url: `${config.baseURL ?? ""}${config.url ?? ""}`,
    withCredentials: config.withCredentials === true,
  });
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    authDebug("api", "response", {
      status: response.status,
      url: response.config.url,
    });
    return response;
  },
  (error) => {
    const status = error.response?.status;

    authDebug("api", "error", {
      status: status ?? "network",
      url: error.config?.url,
      message: error.message,
    });

    if (status === 401 || status === 419) {
      authDebug("api", "emit unauthorized");
      authEvents.emitUnauthorized();
    }

    return Promise.reject(error);
  },
);

export async function ensureCsrfCookie(): Promise<void> {
  await apiClient.get("/sanctum/csrf-cookie");
}
