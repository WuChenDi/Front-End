'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async getUsers() {
    const users = [
      { name: '张三' },
      { name: '李四' },
      { name: '赵五' },
    ];
    // 服务调用服务
    const { service } = this;
    const res = await service.index.echo();
    console.log(`服务调用服务:${res}`);
    return users;
  }

  async getUser(id) {
    const { config } = this;
    console.log(config.api);
    return id;
  }
}

module.exports = UserService;
