const env = process.env.NODE_ENV; // 环境参数

// 配置
let MYSQL_CONF;
let REDIS_CONF;

if (env === "dev") {
	// mysql
	MYSQL_CONF = {
		host: "139.159.200.148",
		user: "root",
		password: "abc123456.",
		port: "19666",
		database: "myblog",
	};

	// redis
	REDIS_CONF = {
		port: 16379,
		host: "139.159.200.148",
	};
}

if (env === "production") {
	// mysql
	MYSQL_CONF = {
		host: "10.100.68.85",
		user: "root",
		password: "abc123456.",
		port: "19666",
		database: "myblog",
	};

	// redis
	REDIS_CONF = {
		port: 16379,
		host: "10.100.68.85",
	};
}

module.exports = {
	MYSQL_CONF,
	REDIS_CONF,
};
