import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAlerts } from "../controllers/alerts.controller.js";

const alertRoutes = Router();

alertRoutes.get("/get", isAuthenticated, getAlerts);

export default alertRoutes;
