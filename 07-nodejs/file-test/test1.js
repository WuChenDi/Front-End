const fs = require("fs");
const path = require("path");

const fileName = path.resolve(__dirname, "data.txt");

// // 读取文件内容;
// fs.readFile(fileName, (err, data) => {
// 	if (err) {
// 		console.log(err);
// 		return;
// 	}
// 	// data 是二进制类型，需要转化为字符串
// 	console.log(data.toString());
// });

// 写入文件;
const content = "这是新写入的内容\n";
const opt = {
	flag: "a", // 追加写入。覆盖用 "w"
};
fs.writeFile(fileName, content, opt, (err) => {
	if (err) {
		console.log(err);
	}
});

// 判断文件是否存在;
// fs.exists(fileName, (exist) => {
// 	console.log(exist);
// });

// 检查文件是否存在于当前目录中。
fs.access(fileName, fs.constants.F_OK, (err) => {
	console.log(`${fileName} ${err ? "不存在" : "存在"}`);
});

// 检查文件是否可读。
fs.access(fileName, fs.constants.R_OK, (err) => {
	console.log(`${fileName} ${err ? "不可读" : "可读"}`);
});

// 检查文件是否可写。
fs.access(fileName, fs.constants.W_OK, (err) => {
	console.log(`${fileName} ${err ? "不可写" : "可写"}`);
});

// 检查文件是否存在于当前目录中、以及是否可写。
fs.access(fileName, fs.constants.F_OK | fs.constants.W_OK, (err) => {
	if (err) {
		console.error(`${fileName} ${err.code === "ENOENT" ? "不存在" : "只可读"}`);
	} else {
		console.log(`${fileName} 存在，且可写`);
	}
});
