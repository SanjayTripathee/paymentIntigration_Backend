import { Router } from "express";
import {
  createWebUserController,
  loginUser,
  verifyEmail,
} from "../controller/webUserController.js";

let webUserRouter = Router();
webUserRouter.route("/").post(createWebUserController);

webUserRouter.route("/verify-email").patch(verifyEmail);

webUserRouter.route("/log-in").post(loginUser);

export default webUserRouter;
