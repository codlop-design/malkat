import { apiClient } from "@/src/lib/apiClient";

export type OrderStatus =
  | "pending"
  | "paid"
  | "completed"
  | "cancelled"
  | "processing"
  | string;

export type OrderListItem = {
  id: number | string;
  status?: OrderStatus;
  total?: number | string;
  total_label?: string;
  created_at?: string;
  items_count?: number;
  // Keep extra fields for future UI.
  [key: string]: unknown;
};

type OrdersApiResponse = {
  success?: boolean;
  message?: string;
  data?: {
    items?: unknown[];
    pagination?: unknown;
  } | unknown[];
};

export type GetOrdersResult = {
  items: OrderListItem[];
};

function toOrderListItem(raw: unknown): OrderListItem | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const id = record.id;
  if (typeof id !== "number" && typeof id !== "string") return null;

  return {
    id,
    status: typeof record.status === "string" ? record.status : undefined,
    total:
      typeof record.total === "number" || typeof record.total === "string"
        ? record.total
        : undefined,
    total_label: typeof record.total_label === "string" ? record.total_label : undefined,
    created_at: typeof record.created_at === "string" ? record.created_at : undefined,
    items_count: typeof record.items_count === "number" ? record.items_count : undefined,
    ...record,
  };
}

function extractItems(payload: OrdersApiResponse["data"]): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    const items = (payload as { items?: unknown[] }).items;
    if (Array.isArray(items)) return items;
  }
  return [];
}

export async function getOrders(params: {
  per_page?: number;
  statuses?: string[];
}): Promise<GetOrdersResult> {
  const { data, status } = await apiClient.get<OrdersApiResponse>("/orders", {
    params: {
      per_page: params.per_page ?? 10,
      statuses: params.statuses?.length ? params.statuses : undefined,
    },
    validateStatus: () => true,
  });

  if (status >= 400 || data?.success === false) {
    return { items: [] };
  }

  const items = extractItems(data?.data)
    .map(toOrderListItem)
    .filter((v): v is OrderListItem => Boolean(v));

  return { items };
}

