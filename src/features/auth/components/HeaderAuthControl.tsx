"use client";

import { UserRound } from "lucide-react";
import Link from "next/link";

import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { cn } from "@/src/lib/utils";

type HeaderAuthControlProps = {
  className?: string;
  loginClassName?: string;
  profileClassName?: string;
  onNavigate?: () => void;
  showName?: boolean;
  nameClassName?: string;
};

export default function HeaderAuthControl({
  className,
  loginClassName,
  profileClassName,
  onNavigate,
  showName = true,
  nameClassName,
}: HeaderAuthControlProps) {
  const { user } = useAuth();

  if (user) {
    return (
      <Link
        href="/profile"
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-2 rounded-full transition-opacity hover:opacity-90",
          profileClassName,
          className,
        )}
        aria-label={`حساب ${user.name}`}
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#E8F6F4] text-primary ring-1 ring-primary/15">
          <UserRound className="size-5" strokeWidth={1.75} aria-hidden />
        </span>
        {showName ? (
          <span
            className={cn(
              "max-w-[140px] truncate text-sm font-medium text-[#454545]",
              nameClassName ?? "hidden sm:inline",
            )}
          >
            {user.name}
          </span>
        ) : null}
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      onClick={onNavigate}
      className={cn(
        "rounded-full bg-primary px-4 py-2.5 text-white transition-opacity hover:opacity-90",
        loginClassName,
        className,
      )}
    >
      تسجيل الدخول
    </Link>
  );
}
