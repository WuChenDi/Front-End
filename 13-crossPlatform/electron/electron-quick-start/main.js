const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

app.on("ready", () => {
	console.log(typeof require("devtron").install);
	// require("devtron").install();

	const mainWindow = new BrowserWindow({
		width: 1000,
		height: 800,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
		},
	});
	mainWindow.loadFile("index.html");
	mainWindow.webContents.openDevTools();

	ipcMain.on("message", (event, args) => {
		console.log(event);
		console.log(args);
		setTimeout(() => {
			event.reply("reply", "yes,I'm mian process");
		}, 1000);
	});

	// const secondWindow = new BrowserWindow({
	// 	width: 400,
	// 	height: 300,
	// 	webPreferences: {
	// 		nodeIntegration: true,
	// 	},
	// 	parent: mainWindow,
	// });
	// secondWindow.loadFile('second.html')
});
