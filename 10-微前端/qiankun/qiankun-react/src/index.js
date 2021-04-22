import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import * as Sentry from "@sentry/react";
import * as Sentry from '@sentry/browser';
import App from "./App";

Sentry.init({ dsn: "http://62930970a87740cf8829d88cde4d0fc3@10.100.68.135:9000/2" });

function render() {
	ReactDOM.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
		document.getElementById("root")
	);
}

if (!window.__POWERED_BY_QIANKUN__) {
	render();
}

export async function bootstrap() {}

export async function mount(props) {
	render();
}

export async function unmount(props) {
	ReactDOM.unmountComponentAtNode(document.getElementById("root"));
}
