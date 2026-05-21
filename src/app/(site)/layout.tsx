import Footer from "@/src/features/layout/Footer";
import Header from "@/src/features/layout/header/Header";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
