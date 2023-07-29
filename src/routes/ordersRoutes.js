import { Router } from "express";
import {
  addProductToOrder,
  getOrder,
  sendOrder,
} from "../controllers/orders.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { orderValidator } from "../config/validators.js";

const ordersRoutes = Router();

ordersRoutes.post("/add", isAuthenticated, orderValidator, addProductToOrder);
ordersRoutes.get("/get", isAuthenticated, getOrder);
ordersRoutes.put("/ask", isAuthenticated, sendOrder);

export default ordersRoutes;
