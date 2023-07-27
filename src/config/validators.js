import { body } from "express-validator";

export const addProductValidator = [
  body("code")
    .exists()
    .withMessage("El código es requerido.")
    .isNumeric()
    .withMessage("El código debe ser de tipo numérico"),
  body("stock")
    .exists()
    .withMessage("El stock es requerido.")
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

export const userRegisterValidator = [
  body("username")
    .exists()
    .withMessage("El nombre es requerido.")
    .isLength({ min: 1 })
    .withMessage("El nombre es requerido."),
  body("password")
    .exists()
    .withMessage("La contraseña es requerido.")
    .isLength({ min: 1 })
    .withMessage("La contraseña es requerida."),
  body("correo")
    .exists()
    .withMessage("El correo es requerido.")
    .isEmail()
    .withMessage("Ingrese un correo valido."),
];

export const userLoginValidator = [
  body("username")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio.")
    .isString()
    .withMessage("El nombre de usuario debe ser una cadena de texto.")
    .isEmail()
    .withMessage(
      "El nombre de usuario debe ser una dirección de correo electrónico válida."
    ),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria.")
    .isString()
    .withMessage("La contraseña debe ser una cadena de texto."),
];
