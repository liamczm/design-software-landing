/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
    unoptimized: true,
  },
  // 启用React严格模式以检测潜在问题
  reactStrictMode: true,
  // 启用SWC压缩以提高性能
  swcMinify: true,
  // 启用增量静态再生成
  experimental: {
    // 启用服务器组件
    serverComponents: true,
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // 添加性能优化配置
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
