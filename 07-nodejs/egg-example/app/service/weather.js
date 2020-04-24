'use strict';

const Controller = require('egg').Controller;

class WeatherController extends Controller {
  async getWeather() {
    const { app } = this;
    const res = await app.curl('https://api.map.baidu.com/telematics/v3/weather', {
      data: {
        ak: 'zVo5SStav7IUiVON0kuCogecm87lonOj',
        output: 'json',
        location: '广州',
      },
      dataType: 'json',
    });
    // console.log(res.data.results[0]);
    return res.data.results[0];
  }
}

module.exports = WeatherController;
