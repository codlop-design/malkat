import { getServerUser } from "@/src/features/auth/session.server";
import Footer from "@/src/features/layout/Footer";
import Header from "@/src/features/layout/header/Header";
import { getSettings, SettingsProvider } from "@/src/features/settings";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, authUser] = await Promise.all([
    getSettings(),
    getServerUser(),
  ]);

  return (
    <SettingsProvider settings={settings}> 
      <Header authUser={authUser} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </SettingsProvider>
  );
}
