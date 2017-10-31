const preactCliSwPrecachePlugin = require('preact-cli-sw-precache');

export default function (config) {
  const precacheConfig = {
    runtimeCaching: [{
      urlPattern: /assets\/*.json/,
      handler: 'fastest'
    },
    {
      urlPattern: /https?:\/\/fonts.+/,
      handler: 'fastest'
    }],
    filename: 'sw.js',
    clientsClaim: true,
    skipWaiting: true,
  };

  return preactCliSwPrecachePlugin(config, precacheConfig);
}