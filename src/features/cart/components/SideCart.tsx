"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/src/components/ui/drawer";
import CartSections, {
  PlaceOrderButton,
} from "@/src/features/cart/components/CartSections";
import SideCartSkeleton from "@/src/features/cart/components/SideCartSkeleton";
import { useCart } from "@/src/features/cart/context/CartProvider";
import type { SideCartProps } from "@/src/features/cart/types/cart-types";

const SideCart = ({ isLoading = false }: SideCartProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount, isHydrated } = useCart();

  useEffect(() => {
    if (pathname === "/cart") {
      setOpen(false);
    }
  }, [pathname]);

  const showSkeleton = isLoading || !isHydrated;

  return (
    <Drawer direction="left" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className="relative size-11 rounded-full border-primary p-0 hover:bg-primary/10"
          variant="outline"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
          >
            <path
              d="M3.06164 14.4413L3.42688 12.2985C3.85856 9.76583 4.0744 8.49951 4.92914 7.74975C5.78389 7 7.01171 7 9.46734 7H14.5327C16.9883 7 18.2161 7 19.0709 7.74975C19.9256 8.49951 20.1414 9.76583 20.5731 12.2985L20.9384 14.4413C21.5357 17.946 21.8344 19.6983 20.9147 20.8491C19.995 22 18.2959 22 14.8979 22H9.1021C5.70406 22 4.00504 22 3.08533 20.8491C2.16562 19.6983 2.4643 17.946 3.06164 14.4413Z"
              stroke="var(--primary)"
              strokeWidth="1.5"
            />
            <path
              d="M7.5 9L7.71501 5.98983C7.87559 3.74176 9.7462 2 12 2C14.2538 2 16.1244 3.74176 16.285 5.98983L16.5 9"
              stroke="var(--primary)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          {itemCount > 0 ? (
            <span className="absolute -top-1 -inset-e-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          ) : null}
          <span className="sr-only">Cart</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-full! max-w-md! border-none! bg-white">
        <DrawerHeader className="flex-row items-center justify-between p-6">
          <DrawerTitle className="text-start text-base">
            حقيبة التسوق الخاصة بى{" "}
            <span className="text-muted-foreground">({itemCount})</span>
          </DrawerTitle>
          <DrawerClose asChild>
            <Button variant="destructive" size="icon">
              <X />
              <span className="sr-only">إغلاق</span>
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto px-6">
          {showSkeleton ? <SideCartSkeleton /> : <CartSections />}
        </div>
        <DrawerFooter>
          <PlaceOrderButton
            className="h-12 gap-2 rounded-2xl bg-primary py-3 text-white hover:bg-primary/90"
            onSuccess={() => setOpen(false)}
          />
          <DrawerClose asChild>
            <Link
              href="/cart"
              className="flex h-12 items-center justify-center rounded-2xl border border-primary px-2 py-3 text-base font-bold text-primary! hover:bg-primary/10"
            >
              عرض السلة
            </Link>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SideCart;
