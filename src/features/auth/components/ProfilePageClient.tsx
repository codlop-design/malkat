"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ProfileView from "@/src/features/auth/components/ProfileView";
import type { AuthUser } from "@/src/features/auth/types";
import { useAuth } from "@/src/features/auth/context/AuthProvider";

export default function ProfilePageClient() {
  const router = useRouter();
  const { user, refreshUser } = useAuth();
  const [fetchedUser, setFetchedUser] = useState<AuthUser | null>(null);

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

  return <ProfileView user={profileUser} />;
}
