import type { NextConfig } from "next";

const IMAGE_ORIGIN = process.env.NEXT_PUBLIC_IMAGE_ORIGIN ?? "";

/** Laravel origin for local dev proxy (no trailing slash). */
const API_PROXY_TARGET =
  process.env.API_PROXY_TARGET ?? "https://malkat-dashboard.codlop.sa";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: IMAGE_ORIGIN,
        pathname: "/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_PROXY_TARGET}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
