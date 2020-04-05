// Web Scoket 封装类方法
export default class WebSocketClass {
	constructor(options) {
		// websocket对象
		this.ws = null;
		this.socketStatus = null; // websocket是否关闭
		// 消息队列，未成功发送的队列
		this.socketMsgQueue = [];
		// 手动记录socket状态 -1:未连接, 0:连接中, 1:已连接 (由于socket存在假死状态不推荐使用readyState)
		this.connectStatus = -1;
		// 重连定时器
		this.reConnInterval = null;
		// 重连次数
		this.RECONNECTION_NUMBER = 20;
		// 记录重连次数
		this.reconnectionCount = 0;
		// 是否开启定心跳检测
		this.isHeartCheck = false;
		// 心跳检测 定时器 初始化
		this.heartTimeout = null;
		this.heartServerTimeout = null;
		// 链接websocket
		this.initConnectSocket();
		// 访客进入
		this.visitor = options.visitor;
		// 消息推送
		this.pushMsg = options.pushMsg;
		// 删除消息
		this.removeChatList = options.removeChatList;
		// 连接/重连 拉取最新消息(可socket返回或ajax手动拉取数据)
		this.reConnectGetMsg = options.reConnectGetMsg;
	}

	// 获取socket链接地址
	getWSURL() {
		return "ws://121.40.165.18:8800";
	}

	// 初始化 连接websocket
	initConnectSocket() {
		// 清除重连定时器
		this.reConnInterval && clearInterval(this.reConnInterval);
		// 判断socket状态
		if (this.ws && this.ws.readyState === 1) {
			this.ws.close();
			this.wss = null;
		}
		this.connectStatus = 0;
		this.ws = new WebSocket(this.getWsURL());

		// WebSocket 连接成功后的回调函数
		this.ws.addEventListener(
			"open",
			() => {
				console.log("websocket connection successful");
				this.connectStatus = 1;
				// 连接次数归零
				this.reconnectionCount = 0;
				//处理未发送或者发送失败消息
				this.socketMsgQueue.forEach((item) => {
					// 重新发送失败的消息
					this.socketSendMessage(item);
				});
				this.socketMsgQueue = [];
				this.reConnectGetMsg();
				// 判断是否启动 socket 心跳检测
				if (this.isHeartCheck) {
					this.heartCheck();
				}
			},
			false
		);

		// 监听服务器接受到信息时的回调函数
		this.ws.addEventListener(
			"message",
			(res) => {
				let message = {};
				if (res.data && typeof res.data !== "object") {
					message = JSON.parse(res.data);
				}
				if (Array.isArray(message)) {
					message.forEach((item) => {
						this.processMessage(item);
					});
				} else {
					this.processMessage(message);
				}
			},
			false
		);

		// WebSocket 连接关闭后的回调函数
		this.ws.addEventListener(
			"close",
			(error) => {
				console.log(`socket has been closed, ${error}`);
				this.connectStatus = -1;
				this.reLinkSocket();
			},
			false
		);

		// WebSocket 连接失败后的回调函数
		this.ws.addEventListener(
			"error",
			(error) => {
				console.log(`socket has been error, ${error}`);
				this.connectStatus = -1;
				this.reLinkSocket();
			},
			false
		);
	}

	// 监听信息推送
	processMessage(message) {
		// 接受到心跳检测返回值
		if (message === "pong") {
			return this.heartCheck();
		}
		if (message.types === "访客进入") {
			this.visitor(message);
		}
		console.log(message);
	}

	// 发送信息
	async sendMessage(data) {
		console.log(`发送消息给服务器:${data}`);

		// 发送消息时，先添加到消息列表显示出来
		// TODO:不能等服务器返回在显示，由于消息服务器可能存在积压状态导致消息推送过慢情况处理
		this.pushMsg(premsg);

		if (this.connectStatus === 1) {
			return this.ws.send(data);
		}
		this.socketMsgQueue.push(message);
		await this.closeSocket();
		await this.reLinkSocket();
	}

	// 撤回消息
	withdrawMessage(data) {
		this.sendMessage(data);
		// 删除消息
		this.removeChatList(data);
	}

	/**
	 * @method 接收消息后格式化消息
	 * @param {Object} message 消息内容
	 * @param {Boolean} isOwn 是否属于自己发出的消息
	 * @return {Array} 返回格式化后消息
	 */
	formatMessageTalk(message, isOwn) {
		// some code...
	}

	// 心跳包检测
	heartCheck() {
		// 心跳机制的时间可以自己与后端约定
		this.heartTimeout && clearTimeout(this.heartTimeout);
		this.heartServerTimeout && clearTimeout(this.heartServerTimeout);
		this.heartTimeout = setTimeout(() => {
			// 检查socket链接状态 才可发送
			if (this.connectStatus === 1) {
				this.ws.send("ping");
			}
			// 如果5s内没有返回约定值判定socket处于假死状态，重新链接socket
			this.heartServerTimeout = setTimeout(async () => {
				console.log("heartCheck timeout");
				await this.closeSocket();
				await this.reLinkSocket();
			}, 5000);
		}, 20000);
	}

	// 关闭WebSocket
	closeSocket() {
		if (this.ws) {
			this.ws.close();
			this.ws = null;
			// 清除重连定时器
			this.reConnInterval && clearInterval(this.reConnInterval);
			// 清除心跳包定时器
			this.heartTimeout && clearTimeout(this.heartTimeout);
			this.heartServerTimeout && clearTimeout(this.heartServerTimeout);
		}
	}

	// 断线重连
	// TODO: 严谨写法需要判断主动重连与被动重连情况
	reLinkSocket() {
		console.log("reconnection webscoket function");
		// 清除心跳包定时器
		this.heartTimeout && clearTimeout(this.heartTimeout);
		this.heartServerTimeout && clearTimeout(this.heartServerTimeout);
		// 清除重连定时器
		this.reConnInterval && clearInterval(this.reConnInterval);
		this.reConnInterval = setInterval(() => {
			// 判断是否达到重连次数
			if (this.reconnectionCount < RECONNECTION_NUMBER) {
				this.connectSocket();
				this.reconnectionCount += 1; // 重连次数
			} else {
				clearInterval(this.reConnInterval);
			}
		}, 5000);
	}
}

const websocket = new WebSocketClass({
	// 访客进入
	visitor: (userInfo) => {
		console.log(userInfo);
		// some code...
	},
	// 消息推送
	pushMsg: (msgdata) => {
		console.log(msgdata);
		// some code...
	},
	// 删除消息
	removeChatList: (messageId) => {
		console.log(messageId);
		// some code...
	},
	// 连接/重连 拉取最新数据
	reConnectGetMsg: () => {
		// 拉取最新消息
	},
});
