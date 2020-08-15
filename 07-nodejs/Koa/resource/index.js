const Koa = require("koa");
const Router = require("koa-router");
const cors = require("@koa/cors");
const koaBody = require("koa-body");
const json = require("koa-json");

const app = new Koa();
const router = new Router();

router.prefix("/api");

router.get("/", (ctx) => {
	console.log(ctx);
	console.log(ctx.request);
	ctx.body = "hello koa";
});

router.get("/api", (ctx) => {
	// console.log(ctx);
	// console.log(ctx.request);
	const params = ctx.request.query;
	console.log(params);
	// ctx.body = "hello Api";
	ctx.body = {
		name: params.name,
		age: params.age,
	};
});

router.get("/async", async (ctx) => {
	ctx.body = await new Promise((resolve) => {
		setTimeout(() => {
			resolve("hello async 2s later");
		}, 2000);
	});
});

router.post("/post", async (ctx) => {
	let { body } = ctx.request;
	console.log(body);
	console.log(ctx.request);
	ctx.body = {
		...body,
	};
});

app.use(koaBody());
app.use(cors());
app.use(json({ pretty: false, param: "pretty" }));
// request, method, respond
// api url function router
// ctx, async
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
