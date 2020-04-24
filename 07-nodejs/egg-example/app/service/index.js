'use strict';

const Service = require('egg').Service;

class IndexService extends Service {
  async echo() {
    const data = [ 1, 2, 3, 4, 5 ];
    return data;
  }
}

module.exports = IndexService;
