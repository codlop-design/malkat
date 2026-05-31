"use client";

import { Heart } from "lucide-react";
import { useState, useTransition, type MouseEvent } from "react";
import { toast } from "sonner";

import { addToFavouritesAction } from "@/src/features/products/api/addToFavouritesAction";
import type { CatalogSectionKey } from "@/src/features/products/types";
import { cn } from "@/src/lib/utils";

type FavouriteButtonProps = {
  category: CatalogSectionKey;
  slug: string;
  isFavourite?: boolean;
  className?: string;
};

export default function FavouriteButton({
  category,
  slug,
  isFavourite: initialIsFavourite = false,
  className,
}: FavouriteButtonProps) {
  const [isFavourite, setIsFavourite] = useState(initialIsFavourite);
  const [isPending, startTransition] = useTransition();

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (isFavourite) {
      return;
    }

    startTransition(async () => {
      const result = await addToFavouritesAction(category, slug);

      if (result.success) {
        setIsFavourite(true);
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
      disabled={isPending || isFavourite}
      className={cn(
        "flex items-center justify-center rounded-full bg-white/90 text-[#454545] shadow-sm transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-70",
        isFavourite && "text-primary",
        className,
      )}
      aria-label={isFavourite ? "في المفضلة" : "إضافة للمفضلة"}
      aria-pressed={isFavourite}
    >
      <Heart
        className={cn("size-5", isFavourite && "fill-primary text-primary")}
        strokeWidth={1.5}
      />
    </button>
  );
}
