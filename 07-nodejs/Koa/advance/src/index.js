import Koa from "koa";
import path from "path";
import helmet from "koa-helmet";
import statics from "koa-static";
import router from "./routes/routes";

const app = new Koa();

app.use(helmet());
app.use(statics(path.join(__dirname, "../public")));
app.use(router());

app.listen(3000);
