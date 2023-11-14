/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.devdojo.com'],
  },
    experimental: {
        serverActions: true,
    },
    async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://127.0.0.1:${process.env.FLASK_PORT}/:path*`, // Proxy to Backend
      },
    ]
  },
}

module.exports = nextConfig