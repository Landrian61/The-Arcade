/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "image.pollinations.ai",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
