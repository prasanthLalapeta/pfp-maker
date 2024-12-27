/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.BLOB_STORE_HOSTNAME,
        port: '',
      },
    ],
  },
  env: {
    GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    BLOB_STORE_HOSTNAME: process.env.BLOB_STORE_HOSTNAME,
  },
};

module.exports = nextConfig;
