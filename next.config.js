/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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

// const runtimeCaching = require("next-pwa/cache");
// const withPWA = require("next-pwa")({
//   dest: "public",
//   disable: process.env.NODE_ENV === "development",
//   runtimeCaching,
// });

// module.exports = withPWA({
//   reactStrictMode: true,
//   i18n,

//   images: {
//     domains: [
//       "images.unsplash.com",
//       "cdn.pixabay.com",
//       "images.pexel.com",
//       "plus.unsplash.com",
//       "api.offerzonebd.com",
//       "www.offerzonebd.com",
//     ],
//     // remotePatterns: [
//     //   {
//     //     protocol: "https",
//     //     hostname: "www.offerzonebd.com",
//     //     port: "",
//     //     pathname: "/**",
//     //   },
//     //   {
//     //     protocol: "https",
//     //     hostname: "api.offerzonebd.com",
//     //     port: "",
//     //     pathname: "/**",
//     //   },
//     // ],
//   },
//   ...(process.env.NODE_ENV === "production" && {
//     typescript: {
//       ignoreBuildErrors: true,
//     },
//     eslint: {
//       ignoreDuringBuilds: true,
//     },
//   }),
// });
