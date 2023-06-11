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


//disable compress lo va a hacer nginx
// module.exports = {
//   compress: false,
// }


// const {PHASE_DEVELOPMENT_SERVER} = requiere('next/constants')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  images: {
      domains: ['localhost', '34.122.102.32', 'cdn-0.apestan.com']
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
