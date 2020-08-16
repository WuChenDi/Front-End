import Koa from "koa";
import path from "path";
import helmet from "koa-helmet";
import statics from "koa-static";
import router from "./routes/routes";
import koaBody from "koa-body";
import jsonutil from "koa-json";
import cors from "@koa/cors";
import compose from "koa-compose";
import compress from "koa-compress";

const app = new Koa();

const isDevMode = process.env.NODE_ENV === "production" ? false : true;

/**
 * 使用 koa-compose 集成中间件
 */
const middleware = compose([
	koaBody(),
	statics(path.join(__dirname, "../public")),
	cors(),
	jsonutil({ pretty: false, param: "pretty" }),
	helmet(),
]);

if (!isDevMode) {
	app.use(compress());
}

app.use(middleware);
app.use(router());

app.listen(3000);
