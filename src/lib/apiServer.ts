import "server-only";

import axios from "axios";

import { SESSION_COOKIE_NAME } from "@/src/features/auth/constants";
import { getRequestSiteUrl } from "@/src/lib/requestSiteUrl";
import {
  buildServerApiHeaders,
  readRequestCookieHeader,
} from "@/src/lib/serverApiHeaders";

async function resolveApiServerBaseUrl(): Promise<string> {
  const authApiBase = process.env.NEXT_PUBLIC_AUTH_API_URL?.replace(/\/$/, "");

  if (authApiBase?.startsWith("/")) {
    return `${await getRequestSiteUrl()}${authApiBase}`;
  }

  return process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
}

/** Server axios — mirrors apiClient; forwards session cookies (withCredentials + Cookie header). */
export const apiServer = axios.create({
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Accept-Language": "ar",
  },
});

apiServer.interceptors.request.use(async (config) => {
  config.baseURL = config.baseURL ?? (await resolveApiServerBaseUrl());

  const cookieHeader = await readRequestCookieHeader();

  if (cookieHeader.includes(SESSION_COOKIE_NAME)) {
    const siteUrl = await getRequestSiteUrl();
    const sessionHeaders = buildServerApiHeaders(cookieHeader, siteUrl);

    for (const [key, value] of Object.entries(sessionHeaders)) {
      config.headers.set(key, value);
    }
  }

  return config;
});
