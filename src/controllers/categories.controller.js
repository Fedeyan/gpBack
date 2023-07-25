import { validationResult } from "express-validator";
import { Categories, Products } from "../config/database.js";
import { httpResponse } from "../config/server-config.js";

export const createCategories = async (req, res) => {
  const { nombre } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const msgs = errors.array().map((err) => {
        return {
          msg: err.msg,
          field: err.path,
        };
      });
      return res.status(400).json(msgs);
    }
    const alrExists = await Categories.findOne({
      where: {
        nombre,
      },
    });

    if (alrExists) {
      return res
        .status(409)
        .json(httpResponse(false, null, "La categoria ya existe."));
    }

    const newCat = await Categories.create({ nombre });
    if (!newCat) {
      return res.json(
        httpResponse(
          false,
          null,
          "Se ha producido un error",
          null,
          "createCategories"
        )
      );
    }


    req.io.emit("fetchCategories")
    req.io.emit("fetchProducts")

    return res.json(
      httpResponse(
        true,
        `La categoria ${nombre} ha sido creada correctamente.`,
        null,
        null,
        "createCategories"
      )
    );
  } catch (error) {
    throw new Error(error);
  }
};
export async function getAllCategories(req, res) {
  try {
    const categories = await Categories.findAll({});
    const result = categories?.map(cat=>{
      return {
        id: cat.id,
        nombre: cat.nombre
      }
    })
    return res.json(result);
  } catch (error) {
    throw new Error(error);
  }
}
