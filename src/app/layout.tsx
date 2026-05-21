import type { Metadata } from "next";
import { Baloo_Bhaijaan_2 } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

const balooBhaijaan2 = Baloo_Bhaijaan_2({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo-bhaijaan-2",
  display: "swap",
});

const SITE_URL = process.env.SITE_URL || "http://localhost:3000";
const SITE_NAME = "منصة تعليم الأطفال";
const SITE_DESCRIPTION = "منصة تعليم الأطفال";
const SITE_KEYWORDS = ["منصة تعليم الأطفال"];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,

  keywords: SITE_KEYWORDS,

  authors: [
    {
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],

  creator: SITE_NAME,
  publisher: SITE_NAME,

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",

    images: [
      {
        url: "/images/logo.svg",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/images/logo.svg"],
  },

  icons: {
    icon: "/images/fav.svg",
    apple: "/images/fav.svg",
  },

  category: "Education",

  verification: {
    google: process.env.NEXT_GOOGLE_VERIFICATION || "",
  },
};

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
        <Toaster position="top-center" richColors />
        {children}
      </body>
    </html>
  );
}
