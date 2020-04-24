'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    // const { ctx } = this;
    // // const name = ctx.query.name;
    // // ctx.body = `app.controllers.posts.index ${name}`;
    // ctx.body = ctx.queries.name;

    const { ctx } = this;
    const res = await this.service.user.getUsers();
    await ctx.render('user', { res });
  }

  async new() {
    const { ctx } = this;
    ctx.body = 'app.controllers.posts.new';
  }

  async show() {
    const { ctx } = this;
    const { id } = ctx.params;
    ctx.body = `app.controllers.posts.show ${id}`;
  }

  async edit() {
    const { ctx } = this;
    const { id } = ctx.params;
    ctx.body = `app.controllers.posts.edit ${id}`;
  }

  async create() {
    const { ctx } = this;
    ctx.body = 'app.controllers.posts.create';
  }

  async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    ctx.body = `app.controllers.posts.update ${id}`;
  }

  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    ctx.body = `app.controllers.posts.destroy ${id}`;
  }

  async getUser() {
    const { ctx, service } = this;
    const data = await service.admin.user.getUser(3);
    ctx.body = data;
  }
}

module.exports = UserController;
