import type { NextConfig } from "next";

const IMAGE_ORIGIN = process.env.NEXT_PUBLIC_IMAGE_ORIGIN ?? "";

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
    const API_PROXY_TARGET =
      process.env.API_PROXY_TARGET ?? "https://malkat-dashboard.codlop.sa";

    return [
      // Proxy Sanctum endpoints so csrf-cookie stays same-origin on localhost.
      {
        source: "/sanctum/:path*",
        destination: `${API_PROXY_TARGET}/sanctum/:path*`,
      },
      // Proxy auth API only; keep non-auth endpoints using their original API URL.
      {
        source: "/auth-api/:path*",
        destination: `${API_PROXY_TARGET}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
