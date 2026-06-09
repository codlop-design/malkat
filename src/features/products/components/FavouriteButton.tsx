"use client";

import { Heart } from "lucide-react";
import { useEffect, useState, useTransition, type MouseEvent } from "react";
import { toast } from "sonner";

import { toggleFavourite } from "@/src/features/products/api/addToFavouritesClient";
import type { CatalogSectionKey } from "@/src/features/products/types";
import { cn } from "@/src/lib/utils";

type FavouriteButtonProps = {
  category: CatalogSectionKey;
  slug: string;
  isFavourite?: boolean;
  className?: string;
  onFavouriteChange?: (isFavourite: boolean) => void;
};

export default function FavouriteButton({
  category,
  slug,
  isFavourite: initialIsFavourite = false,
  className,
  onFavouriteChange,
}: FavouriteButtonProps) {
  const [isFavourite, setIsFavourite] = useState(initialIsFavourite);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsFavourite(initialIsFavourite);
  }, [initialIsFavourite, slug, category]);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    startTransition(async () => {
      const result = await toggleFavourite(category, slug);

      if (result.success) {
        const next = !isFavourite;
        setIsFavourite(next);
        onFavouriteChange?.(next);
        toast.success(result.message);
        return;
      }

      toast.error(result.message);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className={cn(
        "flex items-center justify-center rounded-full bg-white/90 text-[#454545] shadow-sm transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-70",
        isFavourite && "text-primary",
        className,
      )}
      aria-label={isFavourite ? "إزالة من المفضلة" : "إضافة للمفضلة"}
      aria-pressed={isFavourite}
    >
      <Heart
        className={cn("size-5", isFavourite && "fill-primary text-primary")}
        strokeWidth={1.5}
      />
    </button>
  );
}
