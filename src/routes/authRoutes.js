import { Router } from "express";
import {
  loginResult,
  logout,
  userLogin,
  userRegister,
} from "../controllers/register.controller.js";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../config/validators.js";
import isAuthenticated, {
  isNotAuthenticated,
} from "../middlewares/isAuthenticated.js";
import passport from "passport";

const authRoutes = Router();

authRoutes.post(
  "/register",
  userRegisterValidator,
  isNotAuthenticated,
  userRegister
);
authRoutes.post(
  "/login",
  isNotAuthenticated,
  userLoginValidator,
  userLogin,
  passport.authenticate("local", {}),
  loginResult
);
authRoutes.get("/logout", isAuthenticated, logout);

export default authRoutes;
