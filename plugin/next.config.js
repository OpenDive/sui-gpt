/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // {
          //   key: 'Access-Control-Allow-Origin',
          //   value: 'https://chat.openai.com',
          // },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://0.0.0.0:3010',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://localhost:3010',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
