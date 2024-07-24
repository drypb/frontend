/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://nginx:80/:path*",
      },
      {
        source: "/results/download/:analysis_id",
        destination: "http://nginx:80/download_log/:analysis_id",
      }
    ];
  },
};
module.exports = nextConfig;
