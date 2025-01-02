/** @type {import('next').NextConfig} */
const nextConfig = {
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
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: process.env.BLOB_STORE_HOSTNAME,
        port: '',
        pathname: '/**',
      }
    ],
  },
  env: {
    GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    BLOB_STORE_HOSTNAME: process.env.BLOB_STORE_HOSTNAME,
  },
};

module.exports = nextConfig;
