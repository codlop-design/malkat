import { redirect } from "next/navigation";

import { getServerUser } from "@/src/features/auth/api/getServerUser";
import ProfileView from "@/src/features/auth/components/ProfileView";

export default async function ProfilePage() {
  const user = await getServerUser();

  if (!user) {
    redirect("/login");
  }

  return <ProfileView user={user} />;
}
