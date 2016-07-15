const config = {
  appTitle: 'NYPL | React Header App',
  appName: 'NYPL DGX React Header App',
  port: 3001,
  webpackDevServerPort: 3000,
  favIconPath: '//d2znry4lg8s0tq.cloudfront.net/images/favicon.ico',
  refineryApi: {
    root: {
      development: 'https://dev-refinery.nypl.org',
      qa: 'https://qa-refinery.nypl.org',
      production: 'https://refinery.nypl.org',
    },
    endpoint: '/api/nypl/ndo/v0.1/site-data/containers',
    includes: [
      'slots.current-item.square-image',
    ],
  },
};

export default config;
