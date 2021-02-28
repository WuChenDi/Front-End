// const url = require("url");

// const urlString = "https://www.yuque.com/wuchendi/fe/egth5q";

// console.log(url.parse(urlString));

const log4js = require("log4js");

log4js.configure({
	appenders: {
		cheese: {
			type: "file",
			filename: "cheese.log",
		},
	},
	categories: {
		default: {
			appenders: ["cheese"],
			level: "error",
		},
	},
});

const logger = log4js.getLogger("cheese");
logger.level = "debug";

const url = new URL("https://www.yuque.com/wuchendi/fe/egth5q");

// console.log(url.toString());
// console.log(url.toJSON());

logger.debug(url);
logger.debug(url.toString());

// const urlObject = {
// 	href: "https://www.yuque.com/wuchendi/fe/egth5q",
// 	origin: "https://www.yuque.com",
// 	protocol: "https:",
// 	username: "",
// 	password: "",
// 	host: "www.yuque.com",
// 	hostname: "www.yuque.com",
// 	port: "",
// 	pathname: "/wuchendi/fe/egth5q",
// 	search: "",
// 	hash: "",
// };

// logger.debug(url.format(urlObject));
