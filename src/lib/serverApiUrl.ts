import "server-only";

/**
 * Laravel API base for server-side fetch.
 * Uses API_PROXY_TARGET (direct to Laravel) so SSR does not depend on public URL routing.
 */
export function getLaravelApiBase(siteUrl: string): string {
  const proxyTarget = process.env.API_PROXY_TARGET?.replace(/\/$/, "");
  if (proxyTarget) {
    return `${proxyTarget}/api`;
  }
  return `${siteUrl.replace(/\/$/, "")}/api`;
}
