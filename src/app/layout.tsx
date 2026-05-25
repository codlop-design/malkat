import type { Metadata } from "next";
import { Baloo_Bhaijaan_2 } from "next/font/google";
import { RootProviders } from "@/src/components/providers/RootProviders";
import { getSettings } from "@/src/features/settings";

import "./globals.css";

const balooBhaijaan2 = Baloo_Bhaijaan_2({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo-bhaijaan-2",
  display: "swap",
});

import { getSiteUrl } from "@/src/lib/siteUrl";

const SITE_URL = getSiteUrl();
const SITE_NAME = "منصة تعليم الأطفال";
const SITE_DESCRIPTION = "منصة تعليم الأطفال";
const SITE_KEYWORDS = ["منصة تعليم الأطفال"];

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  const siteName = settings?.meta.title ?? settings?.title ?? SITE_NAME;
  const description =
    settings?.meta.description ?? settings?.description ?? SITE_DESCRIPTION;
  const keywords = settings?.meta.keywords
    ? settings.meta.keywords.split(",").map((k) => k.trim())
    : SITE_KEYWORDS;
  const favicon = settings?.meta.favicon ?? "/images/fav.svg";
  const ogImage = settings?.logo ?? "/images/logo.svg";

  return {
    metadataBase: new URL(SITE_URL),

    title: {
      default: siteName,
      template: `%s | ${settings?.title ?? SITE_NAME}`,
    },

    description,

    keywords,

    authors: [
      {
        name: settings?.title ?? SITE_NAME,
        url: SITE_URL,
      },
    ],

    creator: settings?.title ?? SITE_NAME,
    publisher: settings?.title ?? SITE_NAME,

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: SITE_URL,
    },

    openGraph: {
      title: siteName,
      description,
      url: SITE_URL,
      siteName: settings?.title ?? SITE_NAME,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: siteName,
      description,
      images: [ogImage],
    },

    icons: {
      icon: favicon,
      apple: favicon,
    },

    category: "Education",

    verification: {
      google: process.env.NEXT_GOOGLE_VERIFICATION || "",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    jobTitle: SITE_NAME,
    url: process.env.SITE_URL || "",
    sameAs: [process.env.SITE_URL || ""],
  };

  return (
    <html
      lang="ar"
      dir="rtl"
      className={balooBhaijaan2.variable}
      suppressHydrationWarning
    >
      <body className={balooBhaijaan2.className} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
