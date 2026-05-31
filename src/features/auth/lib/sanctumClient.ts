const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const SITE_ORIGIN = API_URL.replace(/\/api\/?$/, "");

function getRequestOrigin() {
  return SITE_ORIGIN;
}

function getXsrfToken(): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export async function ensureCsrfCookie() {
  const path = "/sanctum/csrf-cookie";
  const url = `${getRequestOrigin()}${path}`;
  const logUrl =
    typeof window !== "undefined" ? `${window.location.origin}${path}` : url;

  console.log("[auth/csrf] GET", logUrl);

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  console.log("[auth/csrf] status", response.status, response.statusText);
  console.log("[auth/csrf] XSRF-TOKEN set", Boolean(getXsrfToken()));
  console.log("[auth/csrf] cookies", document.cookie);
}

export async function sanctumFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const xsrf = getXsrfToken();
  const url = `${getRequestOrigin()}${path}`;
  const logUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${path.startsWith("/") ? path : `/${path}`}`
      : url;

  console.log("[auth/fetch]", options.method ?? "GET", logUrl);
  console.log("[auth/fetch] XSRF-TOKEN present", Boolean(xsrf));

  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(xsrf ? { "X-XSRF-TOKEN": xsrf } : {}),
      ...options.headers,
    },
  });

  console.log("[auth/fetch] status", response.status, response.statusText);

  return response;
}
