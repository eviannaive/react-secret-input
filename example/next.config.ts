import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  reactCompiler: true,
  basePath: "/react-secret-input",
  assetPrefix: "/react-secret-input",
};

export default nextConfig;
