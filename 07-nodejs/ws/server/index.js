const WebSocket = require("ws");
const http = require("http");
const wss = new WebSocket.Server({ noServer: true });
const server = http.createServer();
const jwt = require("jsonwebtoken");

const timeInterval = 30000;

let group = {};

wss.on("connection", (ws) => {
	console.log("one client is connected");

	ws.on("message", function (msg) {
		console.log(msg);

		const msgObj = JSON.parse(msg);
		if (msgObj.types === "login") {
			ws.name = msgObj.content;
			ws.roomId = msgObj.roomId;
			if (typeof group[ws.roomId] === "undefined") {
				group[ws.roomId] = 1;
			} else {
				group[ws.roomId]++;
			}
		}
		// 主动发送消息给客户端
		// ws.send(`server: ${msg}`);

		// 鉴权
		if (msgObj.types === "auth") {
			jwt.verify(msgObj.content, "secret", (err, decode) => {
				if (err) {
					// websocket返回前台鉴权失败消息
					ws.send(
						JSON.stringify({
							types: "noauth",
							content: "please auth again",
						})
					);
					console.log("auth error");
					return;
				} else {
					// 鉴权通过
					console.log(decode);
					ws.isAuth = true;
					return;
				}
			});
			return;
		}
		// 拦截非鉴权的请求
		if (!ws.isAuth) return;

		// 心跳检测
		if (msgObj.types === "heartbeat" && msgObj.content === "pong") {
			ws.isAlive = true;
			return;
		}

		// 广播消息
		wss.clients.forEach((client) => {
			// ws !== client &&
			if (client.readyState === WebSocket.OPEN && client.roomId === ws.roomId) {
				msgObj.name = ws.name;
				// msgObj.onlineNum = wss.clients.size;
				msgObj.onlineNum = group[ws.roomId];
				client.send(JSON.stringify(msgObj));
			}
		});
	});

	ws.on("close", function () {
		ws.name && group[ws.roomId]--;
		let msgObj = {};

		// 广播消息
		wss.clients.forEach((client) => {
			// 判断非自己的客户端
			if (client.readyState === WebSocket.OPEN && client.roomId === ws.roomId) {
				msgObj.name = ws.name;
				msgObj.onlineNum = group[ws.roomId];
				msgObj.types = "out";
				client.send(JSON.stringify(msgObj));
			}
		});
	});
});

server.on("upgrade", function upgrade(request, socket, head) {
	console.log("TCL: upgrade -> request", request);

	wss.handleUpgrade(request, socket, head, function done(ws) {
		wss.emit("connection", ws, request);
	});
});

setInterval(() => {
	wss.clients.forEach((ws) => {
		if (!ws.isAlive && ws.roomId) {
			group[ws.roomId]--;
			delete ws["roomId"];
			return ws.terminate();
		}
		// 主动发送心跳检测请求
		// 当客户端返回了消息之后，主动设置flag为在线
		ws.isAlive = false;
		ws.send(
			JSON.stringify({
				types: "heartbeat",
				content: "ping",
				onlineNum: group[ws.roomId],
			})
		);
	});
}, timeInterval);

server.listen(3000);

// const app = require("express")();
// const http = require("http").createServer(app);
// const io = require("socket.io")(http);

// app.get("/", function (req, res) {
// 	res.sendFile(__dirname + "/index.html");
// });

// io.on("connection", function (socket) {
// 	console.log("a socket is connection! ");

// 	socket.on("chatEvent", (msg) => {
// 		console.log(`msg from client: ${msg}`);
// 		// socket.send(`server says: ${msg}`);
// 		socket.broadcast.emit("ServerMsg", msg);
// 	});
// });

// http.listen(3000, function () {
// 	console.log("server is running on: 3000");
// });
