/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
    domains: [],
  },
  webpack: (config, { isServer }) => {
    // Allow importing JSON files
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });
    return config;
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
};

module.exports = nextConfig;
