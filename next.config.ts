import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/population-paradox', destination: '/population-crime-paradox', permanent: true },
      { source: '/crime-types', destination: '/crimes', permanent: true },
      { source: '/safety-score', destination: '/tools/risk-calculator', permanent: true },
    ];
  },
};

export default nextConfig;
