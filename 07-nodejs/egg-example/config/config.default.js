/* eslint valid-jsdoc: "off" */

'use strict';

const fs = require('fs');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1587383328125_1778';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };

  config.api = 'https://eggjs.org';

  // 网络图片
  // config.siteFile = {
  //   '/favicon.ico': 'https://www.mi.com/favicon.ico',
  // };

  config.siteFile = {
    '/favicon.ico': fs.readFileSync('favicon.ico'),
  };

  return {
    ...config,
    ...userConfig,
  };
};
