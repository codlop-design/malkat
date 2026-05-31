import type { NextConfig } from "next";

const IMAGE_ORIGIN =
  process.env.NEXT_PUBLIC_IMAGE_ORIGIN ?? "https://malkat-dashboard.codlop.sa";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      new URL(`${IMAGE_ORIGIN}/**`),
    ],
  },
};
export default nextConfig;
