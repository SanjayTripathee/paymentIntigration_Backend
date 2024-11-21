import { Router } from "express";
import {
  createWebUserController,
  deleteSpeceficUser,
  forgotPassword,
  loginUser,
  myProfile,
  readAllUsers,
  readSpeceficUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateSpeceficUser,
  verifyEmail,
} from "../controller/webUserController.js";
import authorized from "../middleware/authorized.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

let webUserRouter = Router();
webUserRouter.route("/").post(createWebUserController);

webUserRouter.route("/verify-email").patch(verifyEmail);

webUserRouter.route("/login").post(loginUser);


export default webUserRouter;
