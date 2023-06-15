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
      domains: ['localhost', '34.125.92.102', 'cdn-0.apestan.com']
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
/*
async rewrites() {
  return [
      
      {
          source: "/appi/:path*",
          destination: `http://34.125.92.102:8080/api/:path*`
      },
      {
        source: "/files/:path*",
        destination: `http://34.125.92.102:1337/:path*`
    }
  ];
},
}
*/

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer(nextConfig);

module.exports = withBundleAnalyzer(nextConfig)


// https://www.charlievuong.com/using-the-next-js-bundle-analyzer/
// yarn add @next/bundle-analyzer --dev --save
// ANALYZE=true yarn build
