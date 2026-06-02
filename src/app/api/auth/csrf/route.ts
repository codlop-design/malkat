import { NextResponse } from "next/server";

import { appendSetCookies, proxyToApi } from "@/src/app/api/auth/_lib";

export async function GET() {
  const upstream = await proxyToApi("/sanctum/csrf-cookie", { method: "GET" });

  const res = NextResponse.json(
    { ok: upstream.ok },
    { status: upstream.status },
  );

  appendSetCookies(res.headers, upstream.headers);
  return res;
}

