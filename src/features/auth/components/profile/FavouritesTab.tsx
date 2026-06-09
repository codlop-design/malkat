"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useTransition,
} from "react";

import type { CatalogSectionKey } from "@/src/features/products/types";
import { getFavourites } from "@/src/features/products/api/getFavouritesClient";
import {
  renderCatalogCard,
  type CatalogListItem,
} from "@/src/features/products/data/catalogRegistry";

const FAVOURITE_CATEGORIES: ReadonlyArray<{
  id: CatalogSectionKey;
  label: string;
}> = [
  { id: "books", label: "كتب" },
  { id: "courses", label: "دورات" },
  { id: "services", label: "خدمات" },
  { id: "activities", label: "أنشطة" },
  { id: "guides", label: "أدلة" },
];

type FavouritesTabProps = {
  initialCategory?: CatalogSectionKey;
};

export type FavouritesTabHandle = {
  ensureLoaded: () => void;
};

function parseFavCategory(
  value: string | null,
  fallback: CatalogSectionKey,
): CatalogSectionKey {
  switch (value) {
    case "books":
    case "courses":
    case "services":
    case "activities":
    case "guides":
      return value;
    default:
      return fallback;
  }
}

const FavouritesTab = forwardRef<FavouritesTabHandle, FavouritesTabProps>(
  function FavouritesTab({ initialCategory = "books" }, ref) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = parseFavCategory(searchParams.get("fav"), initialCategory);
  const [items, setItems] = useState<CatalogListItem[]>([]);
  const [isPending, startTransition] = useTransition();

  function load(nextCategory: CatalogSectionKey) {
    startTransition(async () => {
      try {
        const result = await getFavourites(nextCategory);
        setItems(result);
      } catch {
        setItems([]);
      }
    });
  }

  function handleRemoveFavourite(slug: string) {
    setItems((current) => current.filter((item) => item.slug !== slug));
  }

  useImperativeHandle(
    ref,
    () => ({
      ensureLoaded() {
        if (isPending || items.length > 0) {
          return;
        }
        load(category);
      },
    }),
    [category, isPending, items.length],
  );

  function setFavParam(nextCategory: CatalogSectionKey) {
    const next = new URLSearchParams(searchParams.toString());
    next.set("fav", nextCategory);
    // keep current tab param as-is
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-black md:text-xl">المفضلة</h1>
        <p className="text-sm text-[#6B7280]">الرئيسية / الملف الشخصي / المفضلة</p>
      </div>

      <div className="mb-6 rounded-2xl bg-[#F3F4F6] p-3">
        <div className="flex flex-wrap items-center gap-2">
          {FAVOURITE_CATEGORIES.map(({ id, label }) => {
            const isActive = category === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setFavParam(id);
                  load(id);
                }}
                className={`h-10 rounded-xl px-4 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-white text-[#111827] hover:bg-[#F9FAFB]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {isPending ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[280px] animate-pulse rounded-2xl bg-[#F3F4F6]"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="py-10 text-center text-sm text-[#717171]">
          لا توجد عناصر في المفضلة حالياً
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id}>
              {renderCatalogCard(category, item, {
                isFavourite: true,
                onFavouriteChange: (isFavourite) => {
                  if (!isFavourite) {
                    handleRemoveFavourite(item.slug);
                  }
                },
              })}
            </div>
          ))}
        </div>
      )}
    </>
  );
  },
);

FavouritesTab.displayName = "FavouritesTab";

export default FavouritesTab;

