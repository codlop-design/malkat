import { headers } from "next/headers";
import { cache } from "react";

import { getSiteUrl } from "@/src/lib/siteUrl";

/** Browser-facing origin (Sanctum Origin / Referer). */
export const getRequestSiteUrl = cache(async (): Promise<string> => {
  const headerList = await headers();

  const host =
    headerList.get("x-forwarded-host")?.split(",")[0]?.trim() ??
    headerList.get("host");
  const proto =
    headerList.get("x-forwarded-proto")?.split(",")[0]?.trim() ?? "https";

  if (host) {
    return `${proto}://${host}`;
  }

  const fromEnv = process.env.SITE_URL?.replace(/\/$/, "");
  if (fromEnv) {
    return fromEnv;
  }

  return getSiteUrl();
});

/** Same-origin API base for server fetches (hits Next rewrite → Laravel). */
export const getRequestApiUrl = cache(async (): Promise<string> => {
  const site = await getRequestSiteUrl();
  return `${site.replace(/\/$/, "")}/api`;
});
