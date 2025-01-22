import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  
  // Configurações de cache e otimização
  onDemandEntries: {
    // Período que as páginas ficam em cache
    maxInactiveAge: 25 * 1000,
    // Número de páginas mantidas em cache
    pagesBufferLength: 2,
  },
  
  webpack: (config) => {
    return config;
  },
};

export default withSentryConfig(nextConfig);