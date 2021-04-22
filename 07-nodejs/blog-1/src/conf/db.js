const env = process.env.NODE_ENV; // 环境参数

// 配置
let MYSQL_CONF;
let REDIS_CONF;

if (env === "dev") {
	// mysql
	MYSQL_CONF = {
		host: "10.100.68.85",
		user: "root",
		password: "wcd0530",
		port: "3306",
		database: "myblog",
	};

	// redis
	REDIS_CONF = {
		port: 6379,
		host: "127.0.0.1",
	};
}

if (env === "production") {
	// mysql
	MYSQL_CONF = {
		host: "10.100.68.85",
		user: "root",
		password: "wcd0530",
		port: "3306",
		database: "myblog",
	};

	// redis
	REDIS_CONF = {
		port: 6379,
		host: "127.0.0.1",
	};
}

module.exports = {
	MYSQL_CONF,
	REDIS_CONF,
};
