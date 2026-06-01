import axios from "axios";
import { cookies } from "next/headers";
import { cache } from "react";

import { authDebug } from "@/src/features/auth/lib/authDebug";
import { API_ORIGIN } from "@/src/lib/apiOrigin";
import { getRequestSiteUrl } from "@/src/lib/requestSiteUrl";

/**
 * Axios for Server Components / Route Handlers.
 * Forwards the browser Cookie header to Laravel (same as withCredentials on the client).
 */
export const getApiServer = cache(async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const siteUrl = await getRequestSiteUrl();

  const client = axios.create({
    baseURL: API_ORIGIN,
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "ar",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      Origin: siteUrl,
      Referer: `${siteUrl}/`,
    },
  });

  client.interceptors.request.use((config) => {
    authDebug("api-server", "request", {
      method: config.method?.toUpperCase(),
      url: `${config.baseURL ?? ""}${config.url ?? ""}`,
      withCredentials: config.withCredentials === true,
      hasCookieHeader: Boolean(config.headers.Cookie),
    });
    return config;
  });

  client.interceptors.response.use(
    (response) => {
      authDebug("api-server", "response", {
        status: response.status,
        url: response.config.url,
      });
      return response;
    },
    (error) => {
      authDebug("api-server", "error", {
        status: error.response?.status ?? "network",
        url: error.config?.url,
      });
      return Promise.reject(error);
    },
  );

  return client;
});
