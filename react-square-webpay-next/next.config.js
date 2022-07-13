/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['@square/web-sdk', 'react-square-web-payments-sdk'])
// remove access token for security, move it to a local file or protected storage
module.exports = withTM({
  env: {
    SQUARE_ACCESS_TOKEN: 'xxxxxxxxxxxxx'
  },
  reactStrictMode: true,
  experimental: {
    esmExternals: 'loose'
  }
})
