import Router from "koa-router";
import publicController from "../api/PublicController";

const router = new Router();

router.get("/demo", publicController.demo);

export default router;
