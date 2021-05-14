// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const { ipcRenderer } = require("electron");
const { BrowserWindow } = require("electron").remote;

window.addEventListener("DOMContentLoaded", () => {
	// document.getElementById("node-version").innerHTML = process.versions.node;
	console.log(`node: ${process.versions.node}`);

	document.getElementById("send").addEventListener("click", () => {
		ipcRenderer.send("message", "hello from renderer");

		const win = new BrowserWindow({ width: 800, height: 600 });
		win.loadURL("https://www.baidu.com");
	});
	ipcRenderer.on("reply", (event, args) => {
		document.getElementById("message").innerHTML = args;
	});
});
