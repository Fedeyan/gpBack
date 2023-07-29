import { Router } from "express";
import {
  getAllOrders,
  isAdmin,
  isAdminAction,
} from "../controllers/admin.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const adminRoutes = Router();

adminRoutes.get("/check", isAuthenticated, isAdmin);
adminRoutes.get("/getAllOrders", isAuthenticated, isAdminAction, getAllOrders);

export default adminRoutes;
