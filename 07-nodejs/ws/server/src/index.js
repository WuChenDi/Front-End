const WebSocket = require("ws");
const http = require("http");
const wss = new WebSocket.Server({ noServer: true });
const server = http.createServer();
const jwt = require("jsonwebtoken");
const { getValue, setValue, existKey } = require("./config/RedisConfig");

const timeInterval = 30000;

let group = {};

const prefix = "DD-";

wss.on("connection", (ws) => {
	console.log("one client is connected");
	ws.isAlive = true;

	ws.on("message", async function (msg) {
		console.log(msg);

		const msgObj = JSON.parse(msg);
		const roomId = prefix + (msgObj.roomId ? msgObj.roomId : ws.roomId);

		if (msgObj.types === "login") {
			ws.userName = msgObj.content;
			ws.roomId = msgObj.roomId;
			ws.uid = msgObj.uid;
			console.log("TCL: connection -> ws.uid", ws.uid);
			// 判断redis中是否有对应的roomid的键值
			const result = await existKey(roomId);
			if (result === 0) {
				// 初始化一个房间数据
				setValue(roomId, ws.uid);
			} else {
				// 已经存在该房间缓存数据
				const arrStr = await getValue(roomId);
				let arr = arrStr.split(",");
				if (arr.indexOf(ws.uid) === -1) {
					setValue(roomId, arrStr + "," + ws.uid);
				}
			}
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
					console.log(group[ws.roomId]);
					ws.send(
						JSON.stringify({
							types: "auth",
							content: decode,
							onlineNum: group[ws.roomId],
						})
					);
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

		/**
		 * 广播消息
		 * 获取房间里所有的用户信息
		 */
		const arrStr = await getValue(roomId);
		let users = arrStr.split(",");
		wss.clients.forEach(async (client) => {
			// ws !== client &&
			// 判断非自己的客户端
			if (client.readyState === WebSocket.OPEN && client.roomId === ws.roomId) {
				msgObj.userName = ws.userName;
				msgObj.onlineNum = group[ws.roomId];
				client.send(JSON.stringify(msgObj));
				// 排队已经发送了消息了客户端 -> 在线
				if (users.indexOf(client.uid) !== -1) {
					users.splice(users.indexOf(client.uid), 1);
				}
				// 消息缓存信息：取redis中的uid数据
				let result = await existKey(ws.uid);
				if (result !== 0) {
					// 存在未发送的离线消息数据
					let tmpArr = await getValue(ws.uid);
					let tmpObj = JSON.parse(tmpArr);
					let uid = ws.uid;
					if (tmpObj.length > 0) {
						let i = [];
						// 遍历该用户的离线缓存数据
						// 判断用户的房间id是否与当前一致
						tmpObj.forEach((item) => {
							if (item.roomId === client.roomId && uid === client.uid) {
								client.send(JSON.stringify(item));
								i.push(item);
							}
						});
						// 删除已经发送的缓存消息数据
						if (i.length > 0) {
							i.forEach((item) => {
								tmpObj.splice(item, 1);
							});
						}
						setValue(ws.uid, JSON.stringify(tmpObj));
					}
				}
			}
		});

		// 断开了与服务端连接的用户的id，并且其他的客户端发送了消息
		if (users.length > 0 && msgObj.types === "message") {
			users.forEach(async (item) => {
				const result = await existKey(item);
				if (result !== 0) {
					// 说明已经存在其他房间该用户的离线消息数据
					let userData = await getValue(item);
					let msgs = JSON.parse(userData);
					msgs.push({
						roomId: ws.roomId,
						...msgObj,
					});
					setValue(item, JSON.stringify(msgs));
				} else {
					// 说明先前这个用户一直在线，并且无离线消息数据
					setValue(
						item,
						JSON.stringify([
							{
								roomId: ws.roomId,
								...msgObj,
							},
						])
					);
				}
			});
		}
	});

	ws.on("close", function () {
		ws.userName && group[ws.roomId]--;
		let msgObj = {};

		// 广播消息
		wss.clients.forEach((client) => {
			// 判断非自己的客户端
			if (client.readyState === WebSocket.OPEN && client.roomId === ws.roomId) {
				msgObj.userName = ws.userName;
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
