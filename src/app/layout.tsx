import type { Metadata } from "next";

import { Toaster } from "sonner";

import Header from "@/src/components/Header";
import "./globals.css";
import Footer from "@/src/components/Footer";

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
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
        <Toaster position="top-center" richColors />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
