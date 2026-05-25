import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/src/lib/siteUrl";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/register", "/forgot-password", "/reset-password", "/cart"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
