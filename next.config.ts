import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // better-auth + pg load from node_modules at runtime instead of being bundled (webpack
  // can't bundle better-auth's multi-dialect kysely adapter). If your app already has a
  // next.config, MERGE this line in rather than overwriting.
  serverExternalPackages: ["better-auth", "pg"],
};

export default nextConfig;
