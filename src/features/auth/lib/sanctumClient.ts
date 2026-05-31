const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

/** Same-origin in the browser (via Next rewrites); direct API origin on the server. */
function getRequestOrigin(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return API_ORIGIN;
}

function getXsrfToken(): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export async function ensureCsrfCookie() {
  const response = await fetch(`${getRequestOrigin()}/sanctum/csrf-cookie`, {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`CSRF cookie request failed: ${response.status}`);
  }
}

export async function sanctumFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const xsrf = getXsrfToken();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return fetch(`${getRequestOrigin()}${normalizedPath}`, {
    ...options,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(xsrf ? { "X-XSRF-TOKEN": xsrf } : {}),
      ...options.headers,
    },
  });
}
