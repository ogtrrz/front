module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_URL || 'https://transotas.org',
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 7000,
    generateRobotsTxt: true,
    exclude: ['/ui', '/with-graphql', '/secure', '/search', '/categorys'],
    robotsTxtOptions: {
      policies: [
        {
          userAgent: "*",
          allow: "/",
        },
        ,
      {
        userAgent: 'black-listed-bot',
        disallow: ['/ui', '/with-graphql', '/secure', '/search', '/categorys'],
      },
      ],
    },
  }