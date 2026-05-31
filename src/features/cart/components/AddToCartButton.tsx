"use client";

import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { useCart } from "@/src/features/cart/context/CartProvider";
import type { AddToCartPayload } from "@/src/features/cart/types/cart-types";
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
  label = "إضافة للسلة",
  variant = "icon",
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    addItem(payload);
    toast.success("تمت الإضافة إلى السلة");
  }

  if (variant === "button") {
    return (
      <Button
        type="button"
        onClick={handleClick}
        className={cn(
          "gap-2 bg-primary text-white hover:bg-primary/90",
          className,
        )}
      >
        <Image src="/basket-add.svg" alt="" width={iconSize} height={iconSize} />
        {label}
      </Button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex items-center justify-center rounded-full bg-primary text-white shadow-md transition-opacity hover:opacity-90",
        className,
      )}
      aria-label={label}
    >
      <Image src="/basket-add.svg" alt="" width={iconSize} height={iconSize} />
    </button>
  );
}
