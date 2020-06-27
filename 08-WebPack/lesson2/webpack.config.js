const path = require("path");

module.exports = {
	mode: "production",
	entry: "./src/index.js", // 打包的入口文件
	output: {
		filename: "bundle.js", // 打包出来的文件的名字
		path: path.resolve(__dirname, "dist"), // 打包完放置文件的文件夹
	},
};
