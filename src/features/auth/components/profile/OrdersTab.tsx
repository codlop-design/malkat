"use client";

import { Package } from "lucide-react";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
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
    new: "جديد",
    completed: "تم التأكيد",
    cancelled: "ملغي",
  };
  return mapped[status] ?? status;
}

function OrderRow({ order }: { order: OrderListItem }) {
  const createdAt = typeof order.created_at === "string" ? order.created_at : undefined;
  const status = typeof order.status === "string" ? order.status : undefined;
  const labelFromApi =
    typeof order.status_label === "string" ? order.status_label : undefined;
  const label = labelFromApi ?? statusLabel(status);

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
  const [items, setItems] = useState<OrderListItem[]>([]);
  const [isPending, startTransition] = useTransition();

  const load = useCallback(() => {
    startTransition(async () => {
      const result = await getOrders({ per_page: 10 });
      setItems(result.items);
    });
  }, []);

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

