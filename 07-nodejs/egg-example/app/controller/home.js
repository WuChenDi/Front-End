'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // const { ctx } = this;
    // // ctx.body = 'hello egg';
    // const data = {
    //   name: '吴陈迪',
    // };
    // await ctx.render('user', { data });

    // const { ctx, service } = this;
    // // 可以调用多个服务
    // const res = await service.user.getUsers();
    // const arr = await service.index.echo();
    // console.log(`home:${arr}`);
    // await ctx.render('user', { res });

    const { ctx, service, app } = this;
    const res = await service.admin.user.getUser();
    console.log(app.foo('hello egg'));
    await ctx.render('user', { res });
  }

  async postegg() {
    const { ctx } = this;
    ctx.body = 'post WUCHENDI';
  }

  async putegg() {
    const { ctx } = this;
    ctx.body = 'put WUCHENDI';
  }

  async patchegg() {
    const { ctx } = this;
    ctx.body = 'patchegg WUCHENDI';
  }

  async deleteegg() {
    const { ctx } = this;
    ctx.body = 'deleteegg WUCHENDI';
  }
}

module.exports = HomeController;
