import { Router } from "express";
import {
  addProductToOrder,
  getOrder,
} from "../controllers/orders.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { orderValidator } from "../config/validators.js";

const ordersRoutes = Router();

ordersRoutes.post("/add", isAuthenticated, orderValidator, addProductToOrder);
ordersRoutes.get("/get", isAuthenticated, getOrder);

export default ordersRoutes;
