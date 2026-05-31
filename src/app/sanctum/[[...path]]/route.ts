import { proxyToApi } from "@/src/lib/apiProxy";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ path?: string[] }> };

async function handler(request: Request, context: RouteContext) {
  const { path } = await context.params;
  const suffix = path?.length ? `/${path.join("/")}` : "";
  return proxyToApi(request, `/sanctum${suffix}`);
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
