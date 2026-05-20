import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
