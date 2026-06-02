import { NextResponse } from "next/server";

import {
  appendSetCookies,
  deleteAuthCookies,
  proxyToApi,
} from "@/src/app/api/auth/_lib";

export async function POST() {
  const csrf = await proxyToApi("/sanctum/csrf-cookie", { method: "GET" });
  const upstream = await proxyToApi("/auth/logout", { method: "POST" });

  const body = await upstream.json().catch(() => null);
  const res = NextResponse.json(body ?? { success: upstream.ok }, {
    status: upstream.status,
  });

  appendSetCookies(res.headers, csrf.headers);
  appendSetCookies(res.headers, upstream.headers);

  // Hard safety: clear local cookies even if upstream doesn't.
  deleteAuthCookies(res.headers);
  return res;
}

