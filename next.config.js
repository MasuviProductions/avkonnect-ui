/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "external-content.duckduckgo.com",
      "avconnect.s3.ap-south-1.amazonaws.com",
      "localhost",
    ],
  },
};
