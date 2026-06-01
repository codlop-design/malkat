import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getServerUser } from "@/src/features/auth/api/getServerUser";
import { probeAuthUser } from "@/src/features/auth/api/probeAuthUser";
import { AUTH_USER_PATH } from "@/src/features/auth/api/sessionClient";
import { getRequestSiteUrl } from "@/src/lib/requestSiteUrl";
import { getSiteUrl } from "@/src/lib/siteUrl";
import { isAuthDebugEnabled } from "@/src/lib/authDebug";

const SESSION_COOKIE = "malkat-session";

export async function GET() {
  if (!isAuthDebugEnabled()) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const cookieStore = await cookies();
  const all = cookieStore.getAll();
  const cookieNames = all.map((cookie) => cookie.name);
  const cookieHeader = all
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const requestSiteUrl = await getRequestSiteUrl();
  const probe = cookieHeader
    ? await probeAuthUser({ cookieHeader, siteUrl: requestSiteUrl })
    : {
        status: "network" as const,
        user: null,
        responsePreview: null,
      };
  const user = await getServerUser();

  const report = {
    endpoint: AUTH_USER_PATH,
    apiBase: process.env.NEXT_PUBLIC_API_URL ?? null,
    envSiteUrl: process.env.SITE_URL ?? null,
    resolvedSiteUrl: requestSiteUrl,
    fallbackSiteUrl: getSiteUrl(),
    cookieCount: cookieNames.length,
    cookieNames,
    hasMalkatSessionOnFrontend: cookieNames.includes(SESSION_COOKIE),
    profileProbeStatus: probe.status,
    profileProbeUser: probe.user?.name ?? null,
    profileProbePreview: probe.responsePreview,
    serverUserResolved: user !== null,
    serverUserName: user?.name ?? null,
    hint: !cookieNames.includes(SESSION_COOKIE)
      ? "malkat-session is missing on the Next.js host — API may set it only on the API domain."
      : null,
  };

  return NextResponse.json(report);
}
