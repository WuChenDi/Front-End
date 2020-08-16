import combineRoutes from "koa-combine-routers";

import demoRouter from "./demoRouter";

export default combineRoutes(demoRouter);
