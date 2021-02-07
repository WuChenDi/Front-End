// const fs = require("fs");
// const path = require("path");

// var name = process.argv[2];

// const readDir = (entry) => {
// 	const dirInfo = fs.readdirSync(entry);
// 	dirInfo.forEach((item) => {
// 		const location = path.join(entry, item);
// 		const info = fs.statSync(location);
// 		if (info.isDirectory()) {
// 			console.log(`dir: ${location}`);
// 			readDir(location);
// 		} else if (info.isFile()) {
// 			fs.stat(location, (err, stats) => {
// 				if (err) return;
// 				console.log(stats);
// 			});
// 			// console.log(`file: ${location}`);
// 		}
// 	});
// };

// readDir(name);

// // console.log(fs.lstatSync(path.join(name)));

const fs = require("fs");
const commander = require("commander");

commander
	.version(packageJson.version, "-v, --version")
	.description(`${packageJson.description}@${packageJson.version}`)
	.option("-l, --list", "show path")
	.parse(process.argv);

let pathStr = commander.args[0];
let fileNames = [];
let dirNames = [];

const readStart = () => {
	const files = fs.readdirSync(pathStr || "./");
	files.forEach((item) => {
		let stat = fs.statSync(item);
		if (stat.isFile()) {
			fileNames.push(
				`file: name:${item}、size:${stat.size}、mtime:${stat.mtime}`
			);
		} else {
			dirNames.push(`dir: name:${item}、size${stat.size}、mtime:${stat.mtime}`);
		}
	});
	console.log([...dirNames, ...fileNames].join("\r\n"));
};

readStart()