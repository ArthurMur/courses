/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  rewrites: () => [
    {
      source: '/storage/:path*',
      destination: `${process.env.S3_ENDPOINT}/:path*`,
    },
  ],
};

export default nextConfig;
