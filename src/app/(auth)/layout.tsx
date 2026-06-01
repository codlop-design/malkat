import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SESSION_COOKIE_NAME } from "@/src/features/auth/constants";

export const dynamic = "force-dynamic";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  if (cookieStore.has(SESSION_COOKIE_NAME)) {
    redirect("/");
  }

  return (
    <main className="md:h-screen h-auto flex md:flex-row flex-col">
      <div className="w-full md:w-1/2">{children}</div>

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
