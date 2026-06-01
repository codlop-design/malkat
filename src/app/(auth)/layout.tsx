import Image from "next/image";
import { redirect } from "next/navigation";

import { getServerUser } from "@/src/features/auth/api/getServerUser";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getServerUser();

  if (user) {
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
