import { validationResult } from "express-validator";
import { Categories, Products } from "../config/database.js";
import { httpResponse } from "../config/server-config.js";

export async function createProduct(req, res, next) {
  const { code, nombre, marca, modelo, categoria, stock } = req.body;
  const imagen = req?.file?.path
  console.log(req.body)
  console.log(imagen)
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const msgs = errors.array().map((err) => {
        return { msg: err.msg, field: err.path };
      });
      return res.status(400).json(msgs);
    }

    const categories = await Categories.findAll();
    if (!categories.length) {
      return res
        .status(500)
        .json(
          httpResponse(
            false,
            null,
            "Para continuar debes añadir al menos una categoría."
          )
        );
    }

    const alrExists = await Products.findOne({
      where: {
        code,
      },
    });

    if (alrExists) {
      return res
        .status(409)
        .json(httpResponse(false, null, "El producto ya existe."));
    }

    const productCategory = await Categories.findOne({
      where: {
        nombre: categoria,
      },
    });

    if (!productCategory) {
      return res
        .status(409)
        .json(httpResponse(false, null, "La categoria solicitada no existe."));
    }

    const newProduct = await Products.create({
      code,
      nombre,
      marca,
      modelo,
      imagen: imagen,
      stock
    });

    await newProduct.setCategories(productCategory);

    if (!newProduct) {
      return res
        .status(500)
        .json(httpResponse(false, null, "Error en el servidor."));
    }

    req.io.emit("fetchCategories");
    req.io.emit("fetchProducts");

    return res.json(httpResponse(true, "Producto añadido con exito."));
  } catch (error) {
    throw new Error(error);
  }
}

export async function uploadProductImage(req, res) {}

export async function getAllProducts(req, res) {
  try {
    const result = await Products.findAll();
    return res.json(result);
  } catch (error) {
    throw new Error(error);
  }
}
