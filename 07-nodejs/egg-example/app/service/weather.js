'use strict';

const Controller = require('egg').Controller;

class WeatherController extends Controller {
  async getWeather(location) {
    const { app } = this;
    const res = await app.curl('https://api.map.baidu.com/telematics/v3/weather', {
      data: {
        ak: 'zVo5SStav7IUiVON0kuCogecm87lonOj',
        output: 'json',
        location,
      },
      dataType: 'json',
    });
    // console.log(res.data.results[0]);
    if (res.data.error === 0) {
      return res.data.results[0];
    }
    return {
      code: -1,
      msg: '请输入正确的城市名称',
    };
  }
}

module.exports = WeatherController;
