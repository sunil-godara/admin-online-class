/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    APP_URL: process.env.APP_URL,
    API_URL: process.env.API_URL
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com"
      },
      {
        protocol: "http",
        hostname: "192.168.8.200:3002"
      }
    ]
  },
  // Add header configurations for larger requests
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Connection",
            value: "keep-alive"
          }
        ]
      }
    ];
  },
  webpack(config) {
    // Adding SVG handling rule
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};

module.exports = nextConfig;
