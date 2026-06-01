import { redirect } from "next/navigation";

import { getServerUser } from "@/src/features/auth/api/getServerUser";
import ProfileView from "@/src/features/auth/components/ProfileView";
import { authDebug } from "@/src/lib/authDebug";

export default async function ProfilePage() {
  const user = await getServerUser();

  if (!user) {
    authDebug("server", "profile page — no server user, redirecting to /login");
    redirect("/login");
  }

  return <ProfileView user={user} />;
}
