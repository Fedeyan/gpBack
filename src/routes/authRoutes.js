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
import { httpResponse } from "../config/server-config.js";

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
  passport.authenticate("local", {
    successRedirect: "/auth/loginresult",
    failureRedirect: "/auth/loginresult",
  })
);

authRoutes.get("/isLogIn", function (req, res) {
  if (req.isAuthenticated()) {
    return res.json(httpResponse(true));
  } else {
    return res.json(httpResponse(false));
  }
});
authRoutes.get("/loginresult", loginResult);
authRoutes.get("/logout", isAuthenticated, logout);

export default authRoutes;
