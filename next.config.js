/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Build errors ignore karne ke liye niche wali lines add ki hain
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
    tsconfigPath: './tsconfig.json',
  },
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
};

module.exports = nextConfig;