const withNextra = require('nextra')({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.js',
  // optional: add `unstable_staticImage: true` to enable Nextra's auto image import
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // any configs you need
    experimental: {
      // Defaults to 50MB
      isrMemoryCacheSize: 0,
    }
}

module.exports = withNextra(nextConfig)
