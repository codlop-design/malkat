"use client";

import { LogOut, Mail, Phone, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { AuthUser } from "@/src/features/auth/types";
import { useAuth } from "@/src/features/auth/context/AuthProvider";

type ProfileViewProps = {
  user: AuthUser;
};

export default function ProfileView({ user }: ProfileViewProps) {
  const router = useRouter();
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
    toast.success("تم تسجيل الخروج");
    router.replace("/");
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-lg rounded-2xl border border-[#E5E5E5] bg-white p-6 md:p-8">
        <div className="flex items-center gap-4 border-b border-[#E5E5E5] pb-6">
          <span className="flex size-16 items-center justify-center rounded-full bg-[#E8F6F4] text-primary">
            <UserRound className="size-8" strokeWidth={1.5} aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xl font-bold text-black">{user.name}</h1>
            <p className="mt-1 text-sm text-[#717171]">حسابي</p>
          </div>
        </div>

        <ul className="mt-6 space-y-4">
          <li className="flex items-center gap-3 text-[#454545]">
            <Mail className="size-5 shrink-0 text-primary" aria-hidden />
            <span className="truncate text-sm">{user.email}</span>
          </li>
          <li className="flex items-center gap-3 text-[#454545]">
            <Phone className="size-5 shrink-0 text-primary" aria-hidden />
            <span className="text-sm" dir="ltr">
              {user.full_phone}
            </span>
          </li>
        </ul>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#E5E5E5] py-3 text-sm font-medium text-[#454545] transition-colors hover:border-primary hover:text-primary"
        >
          <LogOut className="size-4" aria-hidden />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
}
