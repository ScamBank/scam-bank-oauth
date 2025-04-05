import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: "/((?!login).*)",
      destination: "/login",
      permanent: false,
    },
  ],
};

export default nextConfig;
