/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // images: {
  //   domains: ["cdn.pixabay.com"],
  // },
  // experimental: {
  //   serverActions: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        pathname: "**",
      },
    ],
  },
};
module.exports = nextConfig;
