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
};

export default nextConfig;
