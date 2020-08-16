import Router from "koa-router";
import loginController from "../api/LoginController";

const router = new Router();

// 忘记密码
router.post("/forget", loginController.forget);

export default router;
