import { Router } from "express";
import { isAdmin } from "../controllers/admin.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const adminRoutes = Router();

adminRoutes.all("/check", isAuthenticated, isAdmin);

export default adminRoutes;
