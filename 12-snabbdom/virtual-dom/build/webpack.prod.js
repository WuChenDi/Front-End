const merge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

const prodConfig = {
	mode: "production", // production - development
	devtool: "cheap-module-source-map", // cheap-module-source-map - cheap-module-eval-source-map
};

module.exports = merge(commonConfig, prodConfig);
