/**
 * @type {import('next').NextConfig}
 */

const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: [
      "api.pythonbdit.com",
      "api.offerzonebd.com",
      "www.offerzonebd.com",
    ],
  },
  ...(process.env.NODE_ENV === "production" && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
};
module.exports = nextConfig;
