import { headers } from "next/headers";
import { cache } from "react";

import { getSiteUrl } from "@/src/lib/siteUrl";

/** Origin for Laravel Sanctum on server-side API calls. */
export const getRequestSiteUrl = cache(async (): Promise<string> => {
  const fromEnv = process.env.SITE_URL?.replace(/\/$/, "");

  if (fromEnv && !fromEnv.includes("localhost")) {
    return fromEnv;
  }

  const headerList = await headers();

  const host =
    headerList.get("x-forwarded-host")?.split(",")[0]?.trim() ??
    headerList.get("host");
  const proto =
    headerList.get("x-forwarded-proto")?.split(",")[0]?.trim() ?? "https";

  if (host) {
    return `${proto}://${host}`;
  }

  return getSiteUrl();
});
