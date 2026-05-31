const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") ??
  "https://malkat-dashboard.codlop.sa";

function rewriteSetCookie(cookie: string): string {
  return cookie.replace(/;\s*Domain=[^;]*/gi, "");
}

function applySetCookieHeaders(
  upstream: Headers,
  responseHeaders: Headers,
): void {
  if (typeof upstream.getSetCookie === "function") {
    const cookies = upstream.getSetCookie();
    responseHeaders.delete("set-cookie");
    for (const cookie of cookies) {
      responseHeaders.append("set-cookie", rewriteSetCookie(cookie));
    }
    return;
  }

  const setCookie = upstream.get("set-cookie");
  if (setCookie) {
    responseHeaders.set("set-cookie", rewriteSetCookie(setCookie));
  }
}

function rewriteLocationHeader(
  location: string,
  requestUrl: string,
): string {
  if (location.startsWith(API_ORIGIN)) {
    return location.replace(API_ORIGIN, new URL(requestUrl).origin);
  }
  return location;
}

export async function proxyToApi(
  request: Request,
  targetPath: string,
): Promise<Response> {
  const requestUrl = new URL(request.url);
  const target = `${API_ORIGIN}${targetPath}${requestUrl.search}`;

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.set("X-Forwarded-Host", requestUrl.host);
  headers.set("X-Forwarded-Proto", requestUrl.protocol.replace(":", ""));

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer();
  }

  const upstream = await fetch(target, init);
  const responseHeaders = new Headers(upstream.headers);

  applySetCookieHeaders(upstream.headers, responseHeaders);

  const location = responseHeaders.get("location");
  if (location) {
    responseHeaders.set("location", rewriteLocationHeader(location, request.url));
  }

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}
