/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: false,
  images: {
      domains: ['localhost']
  },

  async rewrites() {
      return [
          
          {
              source: "/appi/:path*",
              destination: `http://localhost:8080/api/:path*`
          },
          {
            source: "/files/:path*",
            destination: `http://localhost:1337/:path*`
        }
      ];
  },
}


module.exports = nextConfig
