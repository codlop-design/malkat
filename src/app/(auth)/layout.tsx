import Image from "next/image";
import { redirect } from "next/navigation";

import { getServerUser } from "@/src/features/auth/api/getServerUser";
import AuthGuestGuard from "@/src/features/auth/components/AuthGuestGuard";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (await getServerUser()) {
    redirect("/");
  }

  return (
    <main className="md:h-screen h-auto flex md:flex-row flex-col">
      <div className="w-full md:w-1/2">
        <AuthGuestGuard>{children}</AuthGuestGuard>
      </div>

      <div className="w-full md:w-1/2 relative md:h-full h-[500px]">
        <Image
          src="/auth.jpg"
          alt="منصة التعلم"
          fill
          className="w-full h-full object-cover"
        />
      </div>
    </main>
  );
}
