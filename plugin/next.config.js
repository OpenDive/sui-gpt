/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://0.0.0.0:3010/chat',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
