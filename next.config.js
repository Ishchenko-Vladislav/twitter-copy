/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_JWT_SECRET: process.env.NEXTAUTH_JWT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        // pathname: "",
        // port: "",
        protocol: "https",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.lottie$/,
  //     use: [
  //       {
  //         loader: require.resolve("@svgr/webpack"),
  //         options: {
  //           svgoConfig: {
  //             plugins: {
  //               removeViewBox: false,
  //             },
  //           },
  //         },
  //       },
  //     ],
  //   });

  //   return config;
  // },
};

module.exports = nextConfig;
