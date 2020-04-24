'use strict';

const Controller = require('egg').Controller;

class WatcherController extends Controller {
  async weather() {
    const { ctx, service } = this;
    const data = await service.weather.getWeather();
    await ctx.render('weather', { data });
  }
}

module.exports = WatcherController;
