import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pages that re-render via ISR read content/*.json at runtime; ship those files with them.
  outputFileTracingIncludes: {
    "/**": ["./content/**/*.json"],
  },
};

export default nextConfig;
