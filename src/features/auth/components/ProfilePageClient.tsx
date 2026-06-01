"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import ProfileView from "@/src/features/auth/components/ProfileView";
import { useAuth } from "@/src/features/auth/context/AuthProvider";

export default function ProfilePageClient() {
  const router = useRouter();
  const { user, isAuthReady, refreshUser } = useAuth();

  useEffect(() => {
    if (!isAuthReady) {
      return;
    }

    if (user) {
      return;
    }

    void refreshUser().then((current) => {
      if (!current) {
        router.replace("/login");
      }
    });
  }, [isAuthReady, user, refreshUser, router]);

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
