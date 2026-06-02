export function getSetCookieHeaders(headers: Headers): string[] {
  // Node/undici supports Headers.getSetCookie(); edge may not.
  const anyHeaders = headers as unknown as { getSetCookie?: () => string[] };
  const direct = anyHeaders.getSetCookie?.();
  if (Array.isArray(direct) && direct.length > 0) {
    return direct;
  }

  const single = headers.get("set-cookie");
  if (!single) {
    return [];
  }

  // Best-effort split for combined Set-Cookie header (rare, but can happen behind proxies).
  // We split on comma that is followed by a token ending with '=' (cookie name).
  return single.split(/,(?=[^;,=\s]+=[^;,]*)/g).map((v) => v.trim()).filter(Boolean);
}

