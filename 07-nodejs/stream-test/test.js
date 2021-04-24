// // 标准输入输出 (管道)
process.stdin.pipe(process.stdout);

const http = require("http");
const server = http.createServer((req, res) => {
	if (req.method === "POST") {
		req.pipe(res);
	}
});

server.listen(8800);
