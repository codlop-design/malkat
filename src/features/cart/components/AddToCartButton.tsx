"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { placeFreeOrder } from "@/src/features/cart/api/placeFreeOrderClient";
import { useCart } from "@/src/features/cart/context/CartProvider";
import type { AddToCartPayload } from "@/src/features/cart/types/cart-types";
import { useFavourites } from "@/src/features/products/context/FavouritesProvider";
import { cn } from "@/src/lib/utils";

type AddToCartButtonProps = {
  payload: AddToCartPayload;
  className?: string;
  iconSize?: number;
  label?: string;
  variant?: "icon" | "button";
};

export default function AddToCartButton({
  payload,
  className,
  iconSize = 20,
  label = "طلب المنتج",
  variant = "icon",
}: AddToCartButtonProps) {
  const router = useRouter();
  const { isAuthenticated, isAuthReady } = useAuth();
  const { addItem } = useCart();
  const { setProductBought } = useFavourites();
  const [isPending, setIsPending] = useState(false);
  const isFree = payload.isFree === true;
  const buttonLabel = isFree ? "اشترك" : label;

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (isFree) {
      if (!isAuthReady || isPending) return;

      if (!isAuthenticated) {
        router.push("/login");
        return;
      }

      setIsPending(true);
      const result = await placeFreeOrder(payload);
      setIsPending(false);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      setProductBought(payload.category, payload.slug, true);
      toast.success(result.message);
      return;
    }

    addItem(payload);
    toast.success("تم طلب المنتج");
  }

  const icon = isPending ? (
    <Loader2 className="animate-spin" width={iconSize} height={iconSize} />
  ) : isFree ? (
    <UserRoundPlus width={iconSize} height={iconSize} strokeWidth={2} />
  ) : (
    <Image src="/basket-add.svg" alt="" width={iconSize} height={iconSize} />
  );

  if (variant === "button") {
    return (
      <Button
        type="button"
        disabled={isPending}
        onClick={handleClick}
        className={cn(
          "gap-2 bg-primary text-white hover:bg-primary/90",
          className,
        )}
      >
        {icon}
        {buttonLabel}
      </Button>
    );
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleClick}
      className={cn(
        "flex items-center justify-center rounded-full bg-primary text-white shadow-md transition-opacity hover:opacity-90",
        className,
      )}
      aria-label={buttonLabel}
    >
      {icon}
    </button>
  );
}
