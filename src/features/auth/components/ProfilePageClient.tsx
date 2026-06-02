"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Lock, LogOut, ShoppingBag, UserRound } from "lucide-react";
import { toast } from "sonner";

import type { AuthUser } from "@/src/features/auth/types";
import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { authLog } from "@/src/lib/authLog";
import { InputField } from "@/src/components/InputField";
import PhoneInput from "@/src/components/PhoneInput";

export default function ProfilePageClient() {
  const router = useRouter();
  const { user, refreshUser, logout } = useAuth();
  const [fetchedUser, setFetchedUser] = useState<AuthUser | null>(null);
  const [activeTab, setActiveTab] = useState<
    "profile" | "password" | "favourites" | "orders"
  >("profile");

  const profileUser = user ?? fetchedUser;

  useEffect(() => {
    authLog("profile", "mount", {
      contextUser: user?.name ?? null,
    });

    if (user) {
      return;
    }

    let cancelled = false;

    void refreshUser().then((current) => {
      if (cancelled) {
        return;
      }

      authLog("profile", "after refreshUser", { user: current?.name ?? null });

      if (!current) {
        authLog("profile", "→ redirect /login");
        router.replace("/login");
        return;
      }

      setFetchedUser(current);
    });

    return () => {
      cancelled = true;
    };
  }, [user, refreshUser, router]);

  if (!profileUser) {
    return (
      <div className="container flex min-h-[50vh] items-center justify-center py-16">
        <div
          className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent"
          aria-label="جاري التحميل"
        />
      </div>
    );
  }

  async function handleLogout() {
    await logout();
    toast.success("تم تسجيل الخروج");
    router.replace("/");
  }

  function handleNotReady() {
    toast.message("قريباً", { description: "سيتم توفير هذا القسم قريباً" });
  }

  const tabs = [
    { id: "profile" as const, label: "الملف الشخصي", icon: UserRound },
    { id: "password" as const, label: "تغيير كلمة المرور", icon: Lock },
    { id: "favourites" as const, label: "المفضلة", icon: Heart },
    { id: "orders" as const, label: "طلباتي", icon: ShoppingBag },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F3F4F6]">
      <div className="container py-8 md:py-10">
        <p className="mb-6 text-sm text-[#6B7280]">الرئيسية / الملف الشخصي</p>

        <div className="grid items-start gap-6 lg:grid-cols-[320px_1fr]">
          {/* Left sidebar (as in design) */}
          <aside className="rounded-2xl bg-white p-4 md:p-5">
            <nav className="space-y-3">
              {tabs.map(({ id, label, icon: Icon }) => {
                const isActive = id === activeTab;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      if (id === "profile") {
                        setActiveTab("profile");
                      } else {
                        handleNotReady();
                      }
                    }}
                    className={`flex h-12 w-full items-center justify-between rounded-xl border px-4 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-primary bg-primary text-white"
                        : "border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F9FAFB]"
                    }`}
                  >
                    {/* RTL: keep icon at far right like the screenshot */}
                    <span className="flex items-center gap-2.5">
                      {label}
                    </span>
                    <Icon className="size-4" aria-hidden />
                  </button>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#EF4444] text-sm font-bold text-white hover:bg-[#DC2626]"
            >
              <LogOut className="size-4" aria-hidden />
              تسجيل الخروج
            </button>
          </aside>

          {/* Right content */}
          <section className="rounded-2xl bg-white p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-lg font-bold text-black md:text-xl">
                المعلومات الشخصية
              </h1>
              <p className="text-sm text-[#6B7280]">الرئيسية / الملف الشخصي</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("تم حفظ البيانات");
              }}
              className="space-y-5"
              noValidate
            >
              <div className="grid gap-5 md:grid-cols-2">
                <InputField
                  label="الاسم الكامل"
                  defaultValue={profileUser.name}
                  disabled
                />
                <PhoneInput
                  label="رقم الجوال"
                  defaultValue={profileUser.phone}
                  disabled
                />
              </div>

              <InputField
                label="البريد الإلكتروني"
                type="email"
                defaultValue={profileUser.email}
                disabled
              />

              <button
                type="submit"
                className="h-12 w-full rounded-xl bg-primary text-base font-bold text-white hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                حفظ البيانات
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
