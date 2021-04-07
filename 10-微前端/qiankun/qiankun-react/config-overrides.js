module.exports = {
	webpack: (config) => {
    // 微应用的包名，这里与主应用中注册的微应用名称一致
		config.output.library = "reactApp";
    // 将你的 library 暴露为所有的模块定义下都可运行的方式
		config.output.libraryTarget = "umd";
		config.output.publicPath = "http://localhost:20001";
		return config;
	},
	devServer: (configFunction) => {
		return function (proxy, allowedHost) {
			const config = configFunction(proxy, allowedHost);
			config.headers = {
    		// 配置跨域请求头，解决开发环境的跨域问题
				"Access-Control-Allow-Origin": "*",
			};
			return config;
		};
	},
};
