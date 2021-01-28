const fs = require("fs");
const app = require("express")();
const http = require("http").Server(app);
const socketIo = require("socket.io")(http);
const log4js = require("log4js");
const qs = require("qs");

const PORT = 3000;
const SOCKETPORT = 3443;

log4js.configure({
	appenders: {
		file: {
			type: "file",
			filename: "app.log",
			layout: {
				type: "pattern",
				pattern: "%r %p - %m",
			},
		},
	},
	categories: {
		default: {
			appenders: ["file"],
			level: "debug",
		},
	},
});

const logger = log4js.getLogger();

http.listen(PORT, () => {
	console.log(`server is running no port ${PORT}`);
});

// console.log(socketIo.sockets);

socketIo.sockets.on("connection", (socket) => {
	console.log(connection);
	logger.log(socket);
});
