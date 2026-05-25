import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://images.unsplash.com/**"),
      new URL("https://malkat-dashboard.codlop.sa/**"),
    ],
  },
};

export default nextConfig;
