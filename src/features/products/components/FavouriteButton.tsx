"use client";

import { Heart } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { toast } from "sonner";

import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { toggleFavourite } from "@/src/features/products/api/addToFavouritesClient";
import { useFavourites } from "@/src/features/products/context/FavouritesProvider";
import { useProductFavourite } from "@/src/features/products/hooks/useProductFavourite";
import type { CatalogSectionKey } from "@/src/features/products/types";
import { cn } from "@/src/lib/utils";

type FavouriteButtonProps = {
  category: CatalogSectionKey;
  slug: string;
  className?: string;
  syncMode?: "none" | "product";
  onFavouriteChange?: (isFavourite: boolean) => void;
};

export default function FavouriteButton({
  category,
  slug,
  className,
  syncMode = "none",
  onFavouriteChange,
}: FavouriteButtonProps) {
  const { isAuthenticated } = useAuth();
  const { setFavourite } = useFavourites();
  const { isFavourite, isLoadingFavourites, canToggle } = useProductFavourite(
    category,
    slug,
    { syncMode },
  );
  const [isPending, setIsPending] = useState(false);

  async function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (isPending || !canToggle) return;

    const wasFavourite = isFavourite;
    setIsPending(true);

    if (isAuthenticated) {
      setFavourite(category, slug, !wasFavourite);
    }

    try {
      const result = await toggleFavourite(category, slug, wasFavourite);

      if (result.success) {
        const next = !wasFavourite;
        if (isAuthenticated) {
          setFavourite(category, slug, next);
        }
        onFavouriteChange?.(next);
        toast.success(result.message);
        return;
      }

      if (isAuthenticated) {
        setFavourite(category, slug, wasFavourite);
      }
      toast.error(result.message);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending || isLoadingFavourites}
      className={cn(
        "flex items-center justify-center rounded-full bg-white/90 text-[#454545] shadow-sm transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-70",
        isFavourite && "text-primary",
        isLoadingFavourites && "opacity-60",
        className,
      )}
      aria-label={isFavourite ? "إزالة من المفضلة" : "إضافة للمفضلة"}
      aria-pressed={isFavourite}
      aria-busy={isLoadingFavourites}
    >
      <Heart
        className={cn("size-5", isFavourite && "fill-primary text-primary")}
        strokeWidth={1.5}
      />
    </button>
  );
}
