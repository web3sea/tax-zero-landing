/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tax-zero.cdn.prismic.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tax-zero-landing.cdn.prismic.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
