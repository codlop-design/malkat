"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Button } from "@/src/components/ui/button";
import { placeOrder } from "@/src/features/cart/api/placeOrderClient";
import CartLineItem from "@/src/features/cart/components/CartLineItem";
import { useCart } from "@/src/features/cart/context/CartProvider";

// `CartLineItem` extracted to `src/features/cart/components/CartLineItem.tsx`.

type CartSectionsProps = {
  emptyMessage?: string;
};

export default function CartSections({
  emptyMessage = "سلة التسوق فارغة",
}: CartSectionsProps) {
  const { groupedItems, updateQuantity, removeItem } = useCart();

  if (groupedItems.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-[#717171]">{emptyMessage}</p>
    );
  }

  return (
    <>
      {groupedItems.map((group) => (
        <Accordion
          key={group.id}
          type="single"
          collapsible
          defaultValue={group.title}
        >
          <AccordionItem
            value={group.title}
            className="mb-4 rounded-xl border border-[#C7C7CC] p-3"
          >
            <AccordionTrigger className="items-center gap-2 p-0 no-underline!">
              {group.icon}
              <span className="text-base font-medium text-[#454545]">
                {group.title}
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-2 pb-0 pt-4">
              {group.items.map((item) => (
                <CartLineItem
                  key={item.id}
                  item={item}
                  onQuantityChange={(quantity) =>
                    updateQuantity(item.id, quantity)
                  }
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
}

const confirmIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-5"
    aria-hidden
  >
    <path
      d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
      stroke="white"
      strokeWidth="1.5"
    />
    <path
      d="M8 12.75C8 12.75 9.6 13.6625 10.4 15C10.4 15 12.8 9.75 16 8"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function PlaceOrderButton({
  className,
  onSuccess,
}: {
  className?: string;
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const { items, clearCart, itemCount } = useCart();
  const [isPending, startTransition] = useTransition();

  function handlePlaceOrder() {
    if (itemCount === 0) {
      toast.error("السلة فارغة");
      return;
    }

    startTransition(async () => {
      const result = await placeOrder(items);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      clearCart();
      toast.success(result.message);
      onSuccess?.();
      router.push("/");
    });
  }

  return (
    <Button
      type="button"
      disabled={isPending || itemCount === 0}
      onClick={handlePlaceOrder}
      className={className}
    >
      {confirmIcon}
      <span className="text-base font-bold">تأكيد الطلب</span>
    </Button>
  );
}
