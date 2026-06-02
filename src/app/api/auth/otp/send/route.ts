import { NextResponse } from "next/server";

import { appendSetCookies, proxyToApi } from "@/src/app/api/auth/_lib";

export async function POST(request: Request) {
  const csrf = await proxyToApi("/sanctum/csrf-cookie", { method: "GET" });
  const payload = await request.json().catch(() => null);

  const upstream = await proxyToApi("/auth/otp/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload ? JSON.stringify(payload) : null,
  });

  const body = await upstream.json().catch(() => null);
  const res = NextResponse.json(body, { status: upstream.status });
  appendSetCookies(res.headers, csrf.headers);
  appendSetCookies(res.headers, upstream.headers);
  return res;
}

