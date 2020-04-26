'use strict';

const Controller = require('egg').Controller;

class WatcherController extends Controller {
  async weather() {
    const { ctx, service } = this;
    const data = await service.weather.getWeather('广州');
    await ctx.render('weather', { data });
  }

  async getWeather() {
    const { ctx, service } = this;
    const location = ctx.request.body.location;
    // console.log(location);
    const data = await service.weather.getWeather(location);
    if (data.code === -1) {
      ctx.body = data.msg;
    } else {
      await ctx.render('weather', { data });
    }
  }
}

module.exports = WatcherController;
