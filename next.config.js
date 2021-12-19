/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["avconnect.s3.ap-south-1.amazonaws.com", "localhost"],
    minimumCacheTTL: 0,
  },
};
