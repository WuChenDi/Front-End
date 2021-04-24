// 复制文件
const fs = require("fs");
const path = require("path");

const fileName = path.resolve(__dirname, "data.txt");
const fileNameBak = path.resolve(__dirname, "data-bak.txt");

const readStream = fs.createReadStream(fileName);
const writeStream = fs.createWriteStream(fileNameBak);

readStream.pipe(writeStream);

readStream.on("data", (chunk) => {
	console.log(chunk.toString());
});

readStream.on("end", () => {
	console.log("copy done");
});
