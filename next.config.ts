import type { NextConfig } from "next";

// A static site: every page is rendered at build time into out/, so it can be served from anywhere.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
