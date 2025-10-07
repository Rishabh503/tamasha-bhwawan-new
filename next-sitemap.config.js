/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://tamashabhawan.com', // your live domain (without trailing slash)
  generateRobotsTxt: true, // (optional) creates robots.txt file too
  sitemapSize: 7000, // number of URLs per sitemap file
   sourceDir: 'app'
};
