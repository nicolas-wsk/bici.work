const preactCliSwPrecachePlugin = require('preact-cli-sw-precache');

export default function (config) {
  const precacheConfig = {
    staticFileGlobs: [
      'build/vendor.css',
      'build/vendor.js',
      'build/app.js',
      'build/home.js',
      'build/index.html',
    ],
    runtimeCaching: [{
      urlPattern: /api\/user\//,
      handler: 'networkFirst'
    },{
      urlPattern: /api\/yourSuperCriticalAPI\//,
      handler: 'networkOnly'
    }],
    filename: 'sw.js',
    clientsClaim: true,
    skipWaiting: true,
  };

  return preactCliSwPrecachePlugin(config, precacheConfig);
}