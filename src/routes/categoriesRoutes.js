import { Router } from "express";
import { addCategoriesValidator } from "../config/validators.js";
import { createCategories, getAllCategories } from "../controllers/categories.controller.js";

const categoriesRoutes = Router();

categoriesRoutes.post("/add", addCategoriesValidator, createCategories)
categoriesRoutes.get("/get_all", getAllCategories)
export default categoriesRoutes;
