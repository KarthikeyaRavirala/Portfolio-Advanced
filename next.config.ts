import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages requires basePath to be set for project name
  basePath: process.env.NODE_ENV === 'production' ? '/Portfolio-Advanced' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Portfolio-Advanced/' : '',
  trailingSlash: true,
  output: 'export', // Enables static exports for GitHub Pages
  images: {
    unoptimized: true, // Required for GitHub Pages since we can't use next/image with export
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "react-icons"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }
    return config;
  },
  // Explicitly disable turbopack to work with custom webpack config for static export
  // This is required for GitHub Pages deployment
  // Setting empty turbopack config to satisfy Next.js 16 requirements
  // turbopack: {}
};

export default nextConfig;