import { cookies, headers } from "next/headers";

import { SESSION_COOKIE_NAME } from "@/src/features/auth/constants";
import { getRequestSiteUrl } from "@/src/lib/requestSiteUrl";
import { getSetCookieHeaders } from "@/src/lib/setCookie";

export function getApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (!raw) {
    throw new Error("NEXT_PUBLIC_API_URL is not set");
  }
  return raw;
}

export async function buildForwardHeaders(): Promise<HeadersInit> {
  const siteUrl = await getRequestSiteUrl();
  const headerList = await headers();
  const cookieFromHeader = headerList.get("cookie");

  const cookieHeader =
    cookieFromHeader ??
    (await cookies())
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

  const forward: Record<string, string> = {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Accept-Language": "ar",
    Origin: siteUrl,
    Referer: `${siteUrl}/`,
  };

  if (cookieHeader) {
    forward.Cookie = cookieHeader;
  }

  // If we already have XSRF-TOKEN cookie, forward it as header for Sanctum.
  const xsrfMatch = cookieHeader?.match(/(?:^|;\s*)XSRF-TOKEN=([^;]*)/);
  if (xsrfMatch?.[1]) {
    try {
      forward["X-XSRF-TOKEN"] = decodeURIComponent(xsrfMatch[1]);
    } catch {
      forward["X-XSRF-TOKEN"] = xsrfMatch[1];
    }
  }

  return forward;
}

export async function proxyToApi(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  const url = `${getApiBaseUrl()}${path.startsWith("/") ? "" : "/"}${path}`;
  const forwardHeaders = await buildForwardHeaders();

  const mergedHeaders = new Headers(forwardHeaders);
  if (init?.headers) {
    const extra = new Headers(init.headers);
    extra.forEach((v, k) => mergedHeaders.set(k, v));
  }

  const response = await fetch(url, {
    ...init,
    headers: mergedHeaders,
    cache: "no-store",
  });

  return response;
}

export function appendSetCookies(target: Headers, from: Headers): void {
  for (const value of getSetCookieHeaders(from)) {
    target.append("set-cookie", value);
  }
}

export function deleteAuthCookies(target: Headers): void {
  // Delete the API session cookie (HttpOnly) and XSRF token cookie (not HttpOnly).
  // Domain is intentionally omitted to match the current host cookie scope.
  target.append(
    "set-cookie",
    `${SESSION_COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`,
  );
  target.append(
    "set-cookie",
    `XSRF-TOKEN=; Path=/; Max-Age=0; SameSite=Lax`,
  );
}

