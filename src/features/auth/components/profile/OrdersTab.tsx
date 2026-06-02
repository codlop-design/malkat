"use client";

import { Package } from "lucide-react";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
  useTransition,
} from "react";

import { getOrders, type OrderListItem } from "@/src/features/orders/api/getOrdersClient";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";

export type OrdersTabHandle = {
  ensureLoaded: () => void;
};

const STATUS_OPTIONS = [
  { id: "cancelled", label: "ملغي" },
  { id: "pending", label: "قيد الانتظار" },
  { id: "processing", label: "قيد المعالجة" },
  { id: "paid", label: "مدفوع" },
  { id: "completed", label: "مكتمل" },
] as const;

function formatDate(value?: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function statusLabel(status?: string): string {
  if (!status) return "—";
  const mapped: Record<string, string> = {
    cancelled: "ملغي",
    pending: "قيد الانتظار",
    processing: "قيد المعالجة",
    paid: "مدفوع",
    completed: "مكتمل",
  };
  return mapped[status] ?? status;
}

function OrderRow({ order }: { order: OrderListItem }) {
  const createdAt = typeof order.created_at === "string" ? order.created_at : undefined;
  const status = typeof order.status === "string" ? order.status : undefined;
  const label = statusLabel(status);

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={String(order.id)}
    >
      <AccordionItem
        value={String(order.id)}
        className="mb-4 overflow-hidden rounded-xl border border-[#E5E7EB]"
      >
        <AccordionTrigger className="items-center gap-4 bg-white px-4 py-3 no-underline! hover:bg-[#FAFAFA]">
          {/* left: status dropdown look (not interactive yet) */}
          <span className="flex items-center gap-2">
            <span className="flex h-9 items-center rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827]">
              {label}
            </span>
          </span>

          {/* middle/right: order meta */}
          <span className="ms-auto flex min-w-0 flex-col items-end gap-1 text-right">
            <span className="text-sm font-bold text-black">
              طلب <span dir="ltr">#{String(order.id)}</span>
            </span>
            {createdAt ? (
              <span className="text-xs text-[#6B7280]">{formatDate(createdAt)}</span>
            ) : null}
          </span>

          {/* far right icon */}
          <Package className="size-5 shrink-0 text-[#9CA3AF]" aria-hidden />
        </AccordionTrigger>

        <AccordionContent className="bg-white px-4 pb-4 pt-2">
          <div className="rounded-xl bg-[#F9FAFB] p-4 text-sm text-[#454545]">
            تفاصيل الطلب سيتم إضافتها هنا (كتب/دورات/خدمات...)
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

const OrdersTab = forwardRef<OrdersTabHandle>(function OrdersTab(_, ref) {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(["cancelled"]);
  const [items, setItems] = useState<OrderListItem[]>([]);
  const [isPending, startTransition] = useTransition();

  const activeCount = selectedStatuses.length;

  const queryStatuses = useMemo(
    () => (selectedStatuses.length ? selectedStatuses : undefined),
    [selectedStatuses],
  );

  const load = useCallback(() => {
    startTransition(async () => {
      const result = await getOrders({ per_page: 10, statuses: queryStatuses });
      setItems(result.items);
    });
  }, [queryStatuses]);

  useImperativeHandle(
    ref,
    () => ({
      ensureLoaded() {
        if (isPending || items.length > 0) return;
        load();
      },
    }),
    [isPending, items.length, load],
  );

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-black md:text-xl">طلباتي</h1>
        <p className="text-sm text-[#6B7280]">الرئيسية / الملف الشخصي / طلباتي</p>
      </div>

      <div className="mb-6 rounded-2xl bg-[#F3F4F6] p-3">
        <div className="flex flex-wrap items-center gap-2">
          {STATUS_OPTIONS.map(({ id, label }) => {
            const isActive = selectedStatuses.includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setSelectedStatuses((current) => {
                    const next = current.includes(id)
                      ? current.filter((x) => x !== id)
                      : [...current, id];
                    return next;
                  });
                }}
                className={`h-10 rounded-xl px-4 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-white text-[#111827] hover:bg-[#F9FAFB]"
                }`}
                aria-pressed={isActive}
              >
                {label}
              </button>
            );
          })}

          <button
            type="button"
            onClick={load}
            className="ms-auto h-10 rounded-xl bg-primary px-4 text-sm font-bold text-white hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isPending}
          >
            تحديث{activeCount ? ` (${activeCount})` : ""}
          </button>
        </div>
      </div>

      {isPending ? (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[58px] animate-pulse rounded-xl bg-[#F3F4F6]"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="py-10 text-center text-sm text-[#717171]">
          لا توجد طلبات مطابقة حالياً
        </p>
      ) : (
        <div className="space-y-4">
          {items.map((order) => (
            <OrderRow key={String(order.id)} order={order} />
          ))}
        </div>
      )}
    </>
  );
});

OrdersTab.displayName = "OrdersTab";

export default OrdersTab;

