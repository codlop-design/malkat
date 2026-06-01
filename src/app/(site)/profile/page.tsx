import { redirect } from "next/navigation";

import ProfileView from "@/src/features/auth/components/ProfileView";
import { getServerUser } from "@/src/features/auth/session.server";

export default async function ProfilePage() {
  const user = await getServerUser();

  if (!user) {
    redirect("/login");
  }

  return <ProfileView user={user} />;
}
