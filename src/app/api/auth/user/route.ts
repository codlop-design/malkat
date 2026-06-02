import { NextResponse } from "next/server";

import {
  appendSetCookies,
  deleteAuthCookies,
  proxyToApi,
} from "@/src/app/api/auth/_lib";

export async function GET() {
  const upstream = await proxyToApi("/auth/user", { method: "GET" });
  const body = await upstream.json().catch(() => null);

  const res = NextResponse.json(body, { status: upstream.status });
  appendSetCookies(res.headers, upstream.headers);

  // If session is expired/invalid, aggressively clear cookies on the browser.
  if (upstream.status === 401 || upstream.status === 419) {
    deleteAuthCookies(res.headers);
  }

  return res;
}

