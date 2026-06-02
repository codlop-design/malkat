"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Heart, Lock, ShoppingBag, UserRound } from "lucide-react";
import { toast } from "sonner";

import type { AuthUser } from "@/src/features/auth/types";
import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { authLog } from "@/src/lib/authLog";
import ProfileSidebar from "@/src/features/auth/components/profile/ProfileSidebar";
import ProfileDetailsTab from "@/src/features/auth/components/profile/ProfileDetailsTab";
import FavouritesTab, {
  type FavouritesTabHandle,
} from "@/src/features/auth/components/profile/FavouritesTab";

export default function ProfilePageClient() {
  const router = useRouter();
  const { user, refreshUser, logout } = useAuth();
  const [fetchedUser, setFetchedUser] = useState<AuthUser | null>(null);
  const [activeTab, setActiveTab] = useState<
    "profile" | "password" | "favourites" | "orders"
  >("profile");
  const favouritesRef = useRef<FavouritesTabHandle | null>(null);

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
    <div className="min-h-[calc(100vh-80px)] bg-[#F3F4F6] py-8 md:py-10">
      <div className="container">
        <p className="mb-6 text-sm text-[#6B7280]">الرئيسية / الملف الشخصي</p>

        <div className="grid items-start gap-6 lg:grid-cols-[320px_1fr]">
          <ProfileSidebar
            tabs={tabs}
            activeTab={activeTab}
            onTabClick={(id) => {
              if (id === "profile" || id === "favourites") {
                setActiveTab(id);
                if (id === "favourites") {
                  favouritesRef.current?.ensureLoaded();
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
              <ProfileDetailsTab user={profileUser} />
            </div>
            <div className={activeTab === "favourites" ? "block" : "hidden"}>
              <FavouritesTab ref={favouritesRef} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
