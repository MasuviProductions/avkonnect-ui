/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", process.env.S3_DOMAIN || ""],
    minimumCacheTTL: 0,
  },
};
