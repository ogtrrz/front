/** @type {import('next').NextConfig} */

// const withTM = require('next-transpile-modules')(['@mui/material']); // pass the modules you would like to see transpiled

// module.exports = withTM({
//   reactStrictMode: true,
//   webpack: (config) => {
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       '@material-ui/styled-engine': '@material-ui/styled-engine-sc',
//     };
//     return config;
//   },
// });


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: false,
  images: {
      domains: ['localhost', '34.122.102.32']
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
