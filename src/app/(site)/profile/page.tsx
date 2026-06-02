import { redirect } from "next/navigation";

import { getServerUser } from "@/src/features/auth/session.server";
import ProfileView from "@/src/features/auth/components/ProfileView";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await getServerUser();
  if (!user) {
    redirect("/login");
  }

  return <ProfileView user={user} />;
}
