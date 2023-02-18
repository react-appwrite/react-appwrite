/**
 * @type {import('next').NextConfig}
 */
export default {
  swcMinify: true,
  experimental: {
    appDir: true,
  },

  images: {
    deviceSizes: [640, 768, 1024, 1280, 1536],
    domains: ['localhost'],
  },

  devIndicators: {
    buildActivity: false,
  },
}