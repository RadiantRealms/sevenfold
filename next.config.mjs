/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['mui-tel-input'],
  compiler: {
    styledComponents: true,
  },
  poweredByHeader: false
};

export default nextConfig;
