module.exports = {
	devServer: {
		port: 10001,
		headers: {
      // 配置跨域请求头，解决开发环境的跨域问题
			"Access-Control-Allow-Origin": "*",
		},
	},
	configureWebpack: {
		output: {
      // 微应用的包名，这里与主应用中注册的微应用名称一致
			library: "vueApp",
      // 将你的 library 暴露为所有的模块定义下都可运行的方式
			libraryTarget: "umd",
		},
	},
};
