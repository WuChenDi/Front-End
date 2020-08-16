import combineRoutes from "koa-combine-routers";

import publicRouter from "./publicRouter";
import loginRouter from "./loginRouter";

export default combineRoutes(publicRouter, loginRouter);
