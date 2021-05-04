// next.config.js

const withLess = require('@zeit/next-less')
module.exports = withLess({
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  trailingSlash: true,
  webpack: config => {
    // webpack is wierd with symlinks and handles it strangely (https://github.com/webpack/webpack/issues/985)
    config.resolve.symlinks = false
    return config
  }
})
