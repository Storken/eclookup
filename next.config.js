// next.config.js

const withLess = require('@zeit/next-less')
module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  images: {
    domains: ['localhost', 'eclookup.xyz']
  }
})
