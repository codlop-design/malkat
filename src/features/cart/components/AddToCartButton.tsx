"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { BadgePlus, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { placeFreeOrder } from "@/src/features/cart/api/placeFreeOrderClient";
import { useCart } from "@/src/features/cart/context/CartProvider";
import type { AddToCartPayload } from "@/src/features/cart/types/cart-types";
import { cn } from "@/src/lib/utils";

type AddToCartButtonProps = {
  payload: AddToCartPayload;
  className?: string;
  iconSize?: number;
  label?: string;
  variant?: "icon" | "button";
  reloadPageOnSuccess?: boolean;
};

export default function AddToCartButton({
  payload,
  className,
  iconSize = 20,
  label = "طلب المنتج",
  variant = "icon",
  reloadPageOnSuccess = false,
}: AddToCartButtonProps) {
  const router = useRouter();
  const { isAuthenticated, isAuthReady } = useAuth();
  const { addItem } = useCart();
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

      toast.success(result.message);
      if (reloadPageOnSuccess) {
        window.setTimeout(() => {
          window.location.reload();
        }, 600);
        return;
      }

      router.refresh();
      return;
    }

    addItem(payload);
    toast.success("تم طلب المنتج");
  }

  const icon = isPending ? (
    <Loader2 className="animate-spin" width={iconSize} height={iconSize} />
  ) : isFree ? (
    <BadgePlus width={iconSize} height={iconSize} strokeWidth={2.15} />
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
          "gap-2",
          isFree
            ? "bg-[#F7C948] text-[#123C38] shadow-[0_10px_24px_rgba(247,201,72,0.28)] hover:bg-[#F4BE2A]"
            : "bg-primary text-white hover:bg-primary/90",
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
        "flex items-center justify-center rounded-full shadow-md transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-75",
        isFree
          ? "bg-[#F7C948] text-[#123C38] shadow-[0_10px_24px_rgba(247,201,72,0.36)] hover:bg-[#F4BE2A]"
          : "bg-primary text-white hover:opacity-90",
        className,
      )}
      aria-label={buttonLabel}
    >
      {icon}
    </button>
  );
}
