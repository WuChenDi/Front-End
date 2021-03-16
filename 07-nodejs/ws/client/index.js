const AppVue = new Vue({
	el: "#App",
	data() {
		return {
			loginForm: {
				userName: "",
				roomId: "",
			},
			isShow: true,
			ws: null,
			message: "",
			lists: [],
			onlineNum: 0,
			handle: null,
		};
	},
	watch: {
		lists(v) {
			console.log(v);
		},
	},
	methods: {
		init() {
			// return new Promise((resolve, reject) => {

			// 	resolve();
			// });
			// this.ws = io();
			// this.ws.on("message", (msg) => {
			// 	console.log(msg);
			// });
			this.ws = new WebSocket("ws://127.0.0.1:3000");
			this.ws.onopen = this.onOpen;
			this.ws.onmessage = this.onMessage;
			this.ws.onclone = this.onClone;
			this.ws.onerror = this.onError;
		},
		// 加入 聊天室
		joinChat(formName) {
			this.$refs[formName].validate((valid) => {
				if (!valid) {
					return console.log("Please enter option values");
				}
				const {
					loginForm: { userName, roomId },
					$message,
				} = this;

				if (userName.trim() === "") {
					return $message.error("please enter your userName");
				}

				this.isShow = false;
				this.$nextTick(() => {
					this.init();
				});
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 发送消息
		sendMessage() {
			const {
				message,
				ws,
				loginForm: { userName },
			} = this;
			if (!message) return;

			// this.$message.success(this.message);
			const data = JSON.stringify({
				types: "message",
				content: message,
				userName,
			});
			ws.send(data);
			// this.lists.push(message);
			this.message = "";
		},
		onOpen() {
			const { ws } = this;
			console.log(
				`websocket connection successful, readyState is: ${ws.readyState}`
			);

			// 发起鉴权请求
			ws.send(
				JSON.stringify({
					types: "auth",
					content:
						"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ild1Q2hlbkRpIiwiaWF0IjoxNTE2MjM5MDIyfQ.fKdPOEmmXvj-L4WceUrMf7_NJRvWVL2SF5zqFlndK8Y",
				})
			);
		},
		onMessage(res) {
			// 当用户未进入聊天室，则不接收消息
			if (this.isShow) return;

			const {
				ws,
				loginForm: { userName, roomId },
				$message,
			} = this;
			// 接收服务端发送过来的消息
			const { data } = res;
			if (!res && !data) return;

			const { userName: name, types, content, onlineNum } = JSON.parse(data);
			switch (types) {
				case "noauth":
					// 鉴权失败
					// 路由跳转到 /login 重新获取token
					$message.error(content);
					break;
				case "auth":
					// 鉴权通过
					ws.send(
						JSON.stringify({
							types: "login",
							content: userName,
							roomId,
						})
					);
					break;
				case "login":
					this.lists.push(`welcome ${content} to join chat`);
					break;
				case "out":
					this.lists.push(`${name} Quit the chat room`);
					break;
				case "heartbeat":
					ws.send(
						JSON.stringify({
							types: "heartbeat",
							content: "pong",
						})
					);
					break;

				default:
					if (this.userName !== name) {
						this.lists.push(`${name}: ${content}`);
					}
			}

			this.onlineNum = onlineNum;
		},
		onClone(error) {
			const { ws } = this;
			console.log(
				`socket has been closed, readyState is: ${ws.readyState}, error is :${error}`
			);
			ws.close();
		},
		onError(error) {
			const { ws } = this;
			console.log(
				`socket has been error, readyState is: ${ws.readyState}, error is :${error}`
			);
			// 连接失败之后，1s进行断线重连！
			setTimeout(() => {
				this.init();
			}, 1000);
		},
		checkServer() {
			this.handle && clearTimeout(this.handle);
			this.handle = setTimeout(() => {
				this.onClose();
				setTimeout(() => {
					this.init();
				}, 1000);
				// 设置1ms的时延，调试在服务器测未及时响应时，客户端的反应
			}, 30000 + 1000);
		},
	},
	mounted() {
		this.$nextTick(() => {});
	},
});
