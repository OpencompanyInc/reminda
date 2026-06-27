import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: ["@opencompany/sdk"],
  turbopack: { root: process.cwd() },
};

export default nextConfig;
