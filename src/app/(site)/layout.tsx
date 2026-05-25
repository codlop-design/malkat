import Footer from "@/src/features/layout/Footer";
import Header from "@/src/features/layout/header/Header";
import { getSettings, SettingsProvider } from "@/src/features/settings";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <SettingsProvider settings={settings}>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </SettingsProvider>
  );
}
