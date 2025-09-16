import type { NextConfig } from "next";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

const nextConfig: NextConfig = {
  images: {
    domains: ['i.pinimg.com'],
  },
  eslint: {
    ignoreDuringBuilds: true
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
          fs: false, // fs cannot run in the browser
          net: false,
          tls: false,
        },
      };
    }

    config.plugins.push(new NodePolyfillPlugin());
    return config;
  }
};

export default nextConfig;
