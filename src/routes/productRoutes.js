import { Router } from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/products.controller.js";
import { addProductValidator } from "../config/validators.js";
import { productsImageUpload } from "../config/multer.js";

const productRoutes = Router();

productRoutes.post(
  "/add",
  productsImageUpload.single("imagen"),
  addProductValidator,
  createProduct,
);
productRoutes.get("/get_all", getAllProducts);
export default productRoutes;
