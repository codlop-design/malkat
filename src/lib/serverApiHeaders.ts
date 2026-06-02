import "server-only";

import { cookies, headers } from "next/headers";

import { getRequestSiteUrl } from "@/src/lib/requestSiteUrl";

/** Cookie header from the incoming browser request (for server → Laravel API). */
export async function readRequestCookieHeader(): Promise<string> {
  const headerList = await headers();
  const fromRaw = headerList.get("cookie");

  if (fromRaw) {
    return fromRaw;
  }

  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
}

export function buildServerApiHeaders(
  cookieHeader: string,
  siteUrl: string,
): Record<string, string> {
  const result: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Accept-Language": "ar",
    Cookie: cookieHeader,
    Origin: siteUrl,
    Referer: `${siteUrl}/`,
  };

  const xsrfMatch = cookieHeader.match(/(?:^|;\s*)XSRF-TOKEN=([^;]*)/);
  if (xsrfMatch?.[1]) {
    try {
      result["X-XSRF-TOKEN"] = decodeURIComponent(xsrfMatch[1]);
    } catch {
      result["X-XSRF-TOKEN"] = xsrfMatch[1];
    }
  }

  return result;
}

const GUEST_HEADERS: Record<string, string> = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
  "Accept-Language": "ar",
};

/** Headers + cache mode for server fetch to the Laravel API (session-aware). */
export async function getServerApiFetchOptions(revalidateSeconds: number): Promise<{
  headers: Record<string, string>;
  cache?: RequestCache;
  next?: { revalidate: number };
}> {
  const cookieHeader = await readRequestCookieHeader();

  if (!cookieHeader) {
    return {
      headers: GUEST_HEADERS,
      next: { revalidate: revalidateSeconds },
    };
  }

  return {
    headers: buildServerApiHeaders(cookieHeader, await getRequestSiteUrl()),
    cache: "no-store",
  };
}
