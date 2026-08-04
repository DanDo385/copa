import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "copajewelry.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.copajewelry.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
