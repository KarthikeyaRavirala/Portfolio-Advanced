import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages requires basePath to be set for project name
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio/' : '',
  trailingSlash: true,
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
  // Enable Turbopack for better performance
  turbopack: {},
};

export default nextConfig;