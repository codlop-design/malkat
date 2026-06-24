"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, Clock, Trash } from "lucide-react";

import QuantityControl from "@/src/components/QuantityControl";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { isQuantityAdjustableCategory } from "@/src/features/cart/lib/cartQuantity";
import type { StoredCartItem } from "@/src/features/cart/types/cart-types";

type CartLineItemProps = {
  item: StoredCartItem;
  href?: string;
  onQuantityChange?: (quantity: number) => void;
  onRemove?: () => void;
  showActions?: boolean;
};

export default function CartLineItem({
  item,
  href,
  onQuantityChange,
  onRemove,
  showActions = true,
}: CartLineItemProps) {
  const canAdjustQuantity = isQuantityAdjustableCategory(item.category);

  const content = (
    <>
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
    </>
  );

  return (
    <div className="space-y-4 border-t border-[#E5E5E5] pt-4">
      {href ? (
        <Link
          href={href}
          className="block rounded-lg no-underline transition-colors hover:bg-[#FAFAFA] hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {content}
        </Link>
      ) : (
        content
      )}

      {(showActions || canAdjustQuantity) ? (
        <div
          className={`flex w-full items-center ${showActions ? "justify-between" : ""}`}
        >
          {showActions ? (
            canAdjustQuantity ? (
              <QuantityControl
                quantity={item.quantity}
                onChange={(q) => onQuantityChange?.(q)}
              />
            ) : (
              <span className="text-sm text-[#717171]">الكمية: 1</span>
            )
          ) : (
            <span className="text-sm text-[#717171]">
              الكمية: {item.quantity}
            </span>
          )}
          {showActions ? (
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onRemove?.()}
            >
              <Trash className="size-4" />
              <span className="sr-only">حذف</span>
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

