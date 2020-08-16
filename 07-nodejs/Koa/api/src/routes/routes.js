import combineRoutes from "koa-combine-routers";

import publicRouter from "./publicController";

export default combineRoutes(publicRouter);
