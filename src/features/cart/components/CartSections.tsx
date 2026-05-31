"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BookOpen, Clock, Trash } from "lucide-react";
import { toast } from "sonner";

import QuantityControl from "@/src/components/QuantityControl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { placeOrder } from "@/src/features/cart/api/placeOrderClient";
import { useCart } from "@/src/features/cart/context/CartProvider";
import type { StoredCartItem } from "@/src/features/cart/types/cart-types";

function CartLineItem({
  item,
  onQuantityChange,
  onRemove,
}: {
  item: StoredCartItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}) {
  return (
    <div className="space-y-4 border-t border-[#E5E5E5] pt-4">
      <div className="flex items-center gap-2">
        <Image
          src={item.image}
          alt={item.title}
          width={100}
          height={100}
          className="aspect-square shrink-0 rounded-lg object-cover"
          unoptimized
        />
        <div className="space-y-2">
          <h3 className="line-clamp-2 text-base font-medium text-[#454545]">
            {item.title}
          </h3>
          {item.instructorName ? (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={item.instructorAvatar} />
                <AvatarFallback>{item.instructorName.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className="text-sm text-muted-foreground">{item.instructorName}</p>
            </div>
          ) : null}
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {item.description}
          </p>
        </div>
      </div>

      {item.duration || item.sessions ? (
        <div className="flex items-center gap-4">
          {item.duration ? (
            <span className="flex items-center gap-2 text-sm text-black">
              <Clock className="size-4" />
              {item.duration}
            </span>
          ) : null}
          {item.sessions ? (
            <span className="flex items-center gap-2 text-sm text-black">
              <BookOpen className="size-4" />
              {item.sessions}
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="flex w-full items-center gap-2">
        {item.isOnline ? (
          <span className="rounded-full bg-[#F8F1E7] p-1 text-center text-sm text-muted-foreground">
            اونلاين
          </span>
        ) : null}
        {item.ageRange ? (
          <span className="rounded-full bg-[#F8F1E7] p-1 text-center text-sm text-muted-foreground">
            {item.ageRange}
          </span>
        ) : null}
        {item.level ? (
          <span className="rounded-full bg-[#F8F1E7] p-1 text-center text-sm text-black">
            {item.level}
          </span>
        ) : null}
        {item.isFree ? (
          <span className="ms-auto rounded-full bg-[#E3F0F2] px-3 py-1 text-center text-sm text-black">
            مجاني
          </span>
        ) : null}
      </div>

      <div className="flex w-full items-center justify-between">
        <QuantityControl
          quantity={item.quantity}
          onChange={onQuantityChange}
        />
        <Button variant="destructive" size="icon" onClick={onRemove}>
          <Trash className="size-4" />
          <span className="sr-only">حذف</span>
        </Button>
      </div>
    </div>
  );
}

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
