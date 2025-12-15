import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Settings for GitHub Pages deployment
  output: "export",
  basePath: "/portfolio",
  assetPrefix: "/portfolio/",
};

export default nextConfig;