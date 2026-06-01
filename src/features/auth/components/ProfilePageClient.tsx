"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import ProfileView from "@/src/features/auth/components/ProfileView";
import { useAuth } from "@/src/features/auth/context/AuthProvider";

/** Client fallback when server profile page is not used. */
export default function ProfilePageClient() {
  const router = useRouter();
  const { user, isAuthReady } = useAuth();

  useEffect(() => {
    if (isAuthReady && !user) {
      router.replace("/login");
    }
  }, [isAuthReady, user, router]);

  if (!isAuthReady || !user) {
    return (
      <div className="container flex min-h-[50vh] items-center justify-center py-16">
        <div
          className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent"
          aria-label="جاري التحميل"
        />
      </div>
    );
  }

  return <ProfileView user={user} />;
}
