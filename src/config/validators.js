import { body } from "express-validator";

export const addProductValidator = [
  body("code")
    .exists()
    .withMessage("El código es requerido.")
    .isNumeric()
    .withMessage("El código debe ser de tipo numérico"),
  body("nombre")
    .exists()
    .withMessage("El nombre es requerido.")
    .isLength({ min: 1 })
    .withMessage("Debes ingresar un nombre.")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto."),
  body("marca")
    .exists()
    .withMessage("La marca es requerida.")
    .isLength({ min: 1 })
    .withMessage("Debes ingresar una marca.")
    .isString()
    .withMessage("La marca debe ser una cadena de texto."),
  body("modelo")
    .exists()
    .withMessage("el modelo es requerida.")
    .isLength({ min: 1 })
    .withMessage("Debes ingresar un modelo.")
    .isString()
    .withMessage("El modelo debe ser una cadena de texto."),
  body("categoria")
    .exists()
    .withMessage("La categoria es requerida.")
    .isLength({ min: 1 })
    .withMessage("Debes ingresar una categoria.")
    .isString()
    .withMessage("La categoria debe ser una cadena de texto."),
];

export const addCategoriesValidator = [
  body("nombre")
    .exists()
    .withMessage("El nombre es requerido")
    .isLength({ min: 1 }),
];
