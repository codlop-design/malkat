import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "malkat-dashboard.codlop.sa",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
