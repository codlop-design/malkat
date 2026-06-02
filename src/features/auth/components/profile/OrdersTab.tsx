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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  getOrders,
  type OrderListItem,
} from "@/src/features/orders/api/getOrdersClient";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import CartLineItem from "@/src/features/cart/components/CartLineItem";
import type { StoredCartItem } from "@/src/features/cart/types/cart-types";
import type { CatalogSectionKey } from "@/src/features/products/types";
import { getCategoryIcon } from "@/src/features/cart/data/categoryIcons";

export type OrdersTabHandle = {
  ensureLoaded: () => void;
};

const STATUS_FILTERS = [
  { id: "new", label: "جديد" },
  { id: "completed", label: "تم التأكيد" },
  { id: "cancelled", label: "ملغي" },
] as const;

type StatusFilterId = (typeof STATUS_FILTERS)[number]["id"];

function isStatusFilterId(value: string): value is StatusFilterId {
  return STATUS_FILTERS.some((s) => s.id === value);
}

function parseStatusesParam(value: string | null): StatusFilterId[] {
  if (!value) return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter((v): v is StatusFilterId => Boolean(v) && isStatusFilterId(v));
}

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

function toStoredCartItem(raw: unknown): StoredCartItem | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const product = record.product as Record<string, unknown> | undefined;
  if (!product || typeof product !== "object") return null;

  const slug = typeof product.slug === "string" ? product.slug : null;
  const title = typeof product.title === "string" ? product.title : null;
  const overview = typeof product.overview === "string" ? product.overview : "";
  const image = typeof product.image === "string" ? product.image : "";
  if (!slug || !title) return null;

  const quantity =
    typeof record.quantity === "number" && record.quantity > 0
      ? record.quantity
      : 1;

  const difficulty =
    typeof product.difficulty === "string" ? product.difficulty : undefined;
  const ageGroup =
    typeof product.age_group === "string" ? product.age_group : undefined;
  const price = typeof product.price === "string" ? product.price : "";
  const contributor = product.contributor as
    | Record<string, unknown>
    | undefined;

  return {
    id: String(record.id ?? `${slug}-${Math.random()}`),
    category: (typeof record.type === "string"
      ? record.type
      : "books") as CatalogSectionKey,
    slug,
    title,
    description: overview,
    image,
    isFree: price.includes("مجاني"),
    level: difficulty,
    ageRange: ageGroup,
    instructorName:
      contributor && typeof contributor.name === "string"
        ? contributor.name
        : undefined,
    instructorAvatar:
      contributor && typeof contributor.image === "string"
        ? contributor.image
        : undefined,
    quantity,
  };
}

function OrderRow({ order }: { order: OrderListItem }) {
  const createdAt =
    typeof order.created_at === "string" ? order.created_at : undefined;

  const itemsRecord = (order.items ?? null) as Record<string, unknown> | null;
  const books: unknown[] = Array.isArray(itemsRecord?.books)
    ? (itemsRecord?.books as unknown[])
    : [];
  const courses: unknown[] = Array.isArray(itemsRecord?.courses)
    ? (itemsRecord?.courses as unknown[])
    : [];
  const services: unknown[] = Array.isArray(itemsRecord?.services)
    ? (itemsRecord?.services as unknown[])
    : [];
  const activities: unknown[] = Array.isArray(itemsRecord?.activities)
    ? (itemsRecord?.activities as unknown[])
    : [];

  const sections: Array<{
    key: CatalogSectionKey;
    label: string;
    items: unknown[];
  }> = [
    { key: "books" as const, label: "الكتب", items: books },
    { key: "courses" as const, label: "الدورات", items: courses },
    { key: "services" as const, label: "الخدمات", items: services },
    { key: "activities" as const, label: "الأنشطة", items: activities },
  ].filter((s) => s.items.length > 0);

  return (
    <Accordion type="single" collapsible defaultValue={String(order.id)}>
      <AccordionItem
        value={String(order.id)}
        className="mb-4 overflow-hidden rounded-xl border border-[#E5E7EB]"
      >
        <AccordionTrigger className="items-center gap-4 bg-white px-4 py-3 no-underline! hover:bg-[#FAFAFA]">
          {/* middle/right: order meta */}
          <span className="ms-auto flex min-w-0 flex-col items-end gap-1 text-right">
            <span className="text-sm font-bold text-black">
              طلب <span dir="ltr">#{String(order.id)}</span>
            </span>
            {createdAt ? (
              <span className="text-xs text-[#6B7280]">
                {formatDate(createdAt)}
              </span>
            ) : null}
          </span>

          {/* far right icon */}
          <Package className="size-5 shrink-0 text-[#9CA3AF]" aria-hidden />
        </AccordionTrigger>

        <AccordionContent className="bg-white px-4 pb-4 pt-2">
          {sections.length === 0 ? (
            <div className="rounded-xl bg-[#F9FAFB] p-4 text-sm text-[#454545]">
              تفاصيل الطلب غير متاحة حالياً
            </div>
          ) : (
            <div className="rounded-xl bg-[#F9FAFB] p-4">
              <Accordion type="single" collapsible>
                {sections.map((section) => (
                  <AccordionItem
                    key={section.key}
                    value={section.key}
                    className="mb-3 rounded-xl border border-[#E5E7EB] bg-white px-3 last:mb-0"
                  >
                    <AccordionTrigger className="items-center gap-2 py-3 no-underline! hover:bg-transparent">
                      {getCategoryIcon(section.key as CatalogSectionKey)}
                      <span className="text-sm font-medium text-[#454545]">
                        {section.label}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 pb-3 pt-0">
                      {section.items.map((raw: unknown) => {
                        const item = toStoredCartItem(raw);
                        if (!item) return null;
                        return (
                          <CartLineItem
                            key={item.id}
                            item={item}
                            showActions={false}
                          />
                        );
                      })}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

const OrdersTab = forwardRef<OrdersTabHandle>(function OrdersTab(_, ref) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedStatuses = useMemo(
    () => parseStatusesParam(searchParams.get("statuses")),
    [searchParams],
  );

  const [items, setItems] = useState<OrderListItem[]>([]);
  const [isPending, startTransition] = useTransition();

  const load = useCallback((statuses?: string[]) => {
    startTransition(async () => {
      const result = await getOrders({ per_page: 10, statuses });
      setItems(result.items);
    });
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      ensureLoaded() {
        if (isPending || items.length > 0) return;
        load(selectedStatuses.length ? selectedStatuses : undefined);
      },
    }),
    [isPending, items.length, load, selectedStatuses],
  );

  function setStatusesParam(next: string[]) {
    const sp = new URLSearchParams(searchParams.toString());
    if (next.length === 0) {
      sp.delete("statuses");
    } else {
      sp.set("statuses", next.join(","));
    }
    router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-black md:text-xl">طلباتي</h1>
        <p className="text-sm text-[#6B7280]">
          الرئيسية / الملف الشخصي / طلباتي
        </p>
      </div>

      <div className="mb-6 rounded-2xl bg-[#F3F4F6] p-3">
        <div className="flex flex-wrap items-center gap-2">
          {STATUS_FILTERS.map(({ id, label }) => {
            const isActive = selectedStatuses.includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => {
                  const next = isActive
                    ? selectedStatuses.filter((s) => s !== id)
                    : [...selectedStatuses, id];
                  setStatusesParam(next);
                  load(next.length ? next : undefined);
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
