"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Heart, Lock, ShoppingBag, UserRound } from "lucide-react";
import { toast } from "sonner";

import type { AuthUser } from "@/src/features/auth/types";
import { useAuth } from "@/src/features/auth/context/AuthProvider";
import ProfileSidebar from "@/src/features/auth/components/profile/ProfileSidebar";
import ProfileDetailsTab from "@/src/features/auth/components/profile/ProfileDetailsTab";
import FavouritesTab, {
  type FavouritesTabHandle,
} from "@/src/features/auth/components/profile/FavouritesTab";
import ChangePasswordTab from "@/src/features/auth/components/profile/ChangePasswordTab";
import OrdersTab, {
  type OrdersTabHandle,
} from "@/src/features/auth/components/profile/OrdersTab";

type ProfileTabId = "profile" | "password" | "favourites" | "orders";

function parseProfileTab(value: string | null): ProfileTabId {
  switch (value) {
    case "profile":
    case "password":
    case "favourites":
    case "orders":
      return value;
    default:
      return "profile";
  }
}

export default function ProfilePageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, refreshUser, logout, setUser } = useAuth();
  const [fetchedUser, setFetchedUser] = useState<AuthUser | null>(null);
  const favouritesRef = useRef<FavouritesTabHandle | null>(null);
  const ordersRef = useRef<OrdersTabHandle | null>(null);

  const activeTab = parseProfileTab(searchParams.get("tab"));

  const profileUser = user ?? fetchedUser;

  useEffect(() => {
    if (user) {
      return;
    }

    let cancelled = false;

    void refreshUser().then((current) => {
      if (cancelled) {
        return;
      }

      if (!current) {
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

  function setSearchParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams.toString());
    next.set(key, value);

    // Clean up tab-specific params when leaving their tabs.
    if (key === "tab") {
      if (value !== "favourites") {
        next.delete("fav");
      }
      if (value !== "orders") {
        next.delete("statuses");
      }
    }

    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  }

  const tabs = [
    { id: "profile" as const, label: "الملف الشخصي", icon: UserRound },
    { id: "password" as const, label: "تغيير كلمة المرور", icon: Lock },
    { id: "favourites" as const, label: "المفضلة", icon: Heart },
    { id: "orders" as const, label: "طلباتي", icon: ShoppingBag },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F3F4F6] py-8 md:py-10">
      <div className="container">
        <p className="mb-6 text-sm text-[#6B7280]">الرئيسية / الملف الشخصي</p>

        <div className="grid items-start gap-6 lg:grid-cols-[320px_1fr]">
          <ProfileSidebar
            tabs={tabs}
            activeTab={activeTab}
            onTabClick={(id) => {
              if (
                id === "profile" ||
                id === "favourites" ||
                id === "password" ||
                id === "orders"
              ) {
                setSearchParam("tab", id);
                if (id === "favourites") {
                  favouritesRef.current?.ensureLoaded();
                }
                if (id === "orders") {
                  ordersRef.current?.ensureLoaded();
                }
              } else {
                handleNotReady();
              }
            }}
            onLogout={handleLogout}
          />

          {/* Right content */}
          <section className="rounded-2xl bg-white p-6 md:p-8">
            <div className={activeTab === "profile" ? "block" : "hidden"}>
              <ProfileDetailsTab
                user={profileUser}
                onUserUpdated={(next) => {
                  setUser(next);
                  setFetchedUser(next);
                }}
              />
            </div>
            <div className={activeTab === "favourites" ? "block" : "hidden"}>
              <FavouritesTab ref={favouritesRef} />
            </div>
            <div className={activeTab === "password" ? "block" : "hidden"}>
              <ChangePasswordTab />
            </div>
            <div className={activeTab === "orders" ? "block" : "hidden"}>
              <OrdersTab ref={ordersRef} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
