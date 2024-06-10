/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://localhost:8081/:path*', // Change le port si nécessaire
      },
    ];
  },
};

export default nextConfig;
