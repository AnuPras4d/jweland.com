/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: false,  // ✅ disables size-limited server actions
  },
  compress: true,          // ✅ enables gzip compression
  images: {
    unoptimized: true,     // ✅ required for <img src="/upload/..." />
  },
};

export default nextConfig;
