const redis = require("redis");

// 创建客户端
const redisClient = redis.createClient(16379, "139.159.200.148");
redisClient.on("error", (err) => {
	console.error(err);
});

// 测试
// redisClient.set("myname", "wcd2", redis.print);
redisClient.get("myname", (err, val) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log("val", val);

	// 退出
	redisClient.quit();
});
