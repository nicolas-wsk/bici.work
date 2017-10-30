const preactCliSwPrecachePlugin = require('preact-cli-sw-precache');

export default function (config) {
  const precacheConfig = {
    staticFileGlobs: [
      'build/*'
    ],
    // runtimeCaching: [{
    //   urlPattern: /api\/user\//,
    //   handler: 'networkFirst'
    // },{
    //   urlPattern: /api\/yourSuperCriticalAPI\//,
    //   handler: 'networkOnly'
    // }],
    filename: 'sw.js',
    clientsClaim: true,
    skipWaiting: true,
  };

  return preactCliSwPrecachePlugin(config, precacheConfig);
}