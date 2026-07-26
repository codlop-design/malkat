"use client";

import Link from "next/link";
import { UserRoundPlus } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

type ProductInterestButtonProps = {
  className?: string;
  label?: string;
};

export default function ProductInterestButton({
  className,
  label = "سجل اهتمامك",
}: ProductInterestButtonProps) {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "gap-2 border-primary text-primary hover:bg-primary/5 hover:text-primary",
        className,
      )}
    >
      <Link href="/register-your-interest">
        <UserRoundPlus className="size-5" strokeWidth={1.8} aria-hidden />
        {label}
      </Link>
    </Button>
  );
}
