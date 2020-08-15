const path = require("path");
const Koa = require("koa");
const helmet = require("koa-helmet");
const static = require("koa-static");

const app = new Koa();

const router = require("./routes/routes");
app.use(helmet());
app.use(static(path.join(__dirname, "../public")));
app.use(router());

app.listen(3000);
