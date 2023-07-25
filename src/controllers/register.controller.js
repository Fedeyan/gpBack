import passport from "passport";
import { httpResponse } from "../config/server-config.js";
import { validationResult } from "express-validator";
import { User, UserData } from "../config/database.js";
import { Op } from "sequelize";

export async function userRegister(req, res, next) {
  const { username, password, correo } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(
        errors.array().map(function (error) {
          return {
            msg: error.msg,
            path: error.path,
          };
        })
      );
    }

    const alrExists = await User.findOne({
      where: {
        correo: correo,
      },
    });

    if (alrExists) {
      return res.json(httpResponse(false, null, "El usuario ya existe."));
    }

    const newUserdata = await UserData.create();
    const newUser = await User.create({
      nombre: username,
      contraseña: password,
      correo,
    });

    if (!newUser || !newUserdata) {
      throw new Error("Error al registrar usuario.");
    }
    await newUserdata.setUser(newUser);

    return res.json(httpResponse(true, "Registro exitoso"));
  } catch (error) {
    throw new Error(error);
  }
}

export function userLogin(req, res, next) {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.json(
        err.array().map((e) => {
          return {
            msg: e.msg,
            path: e.path,
          };
        })
      );
    }
    return next();
  } catch (error) {
    throw new Error(error);
  }
}
export function loginResult(req, res) {
  try {
    if (!req.isAuthenticated()) {
      return res.json(
        httpResponse(false, null, "Usuario o contraseña incorrectos.")
      );
    }
    return res.json(httpResponse(true, "Inicio de sesión exitoso."));
  } catch (error) {
    throw new Error(error);
  }
}

export function logout(req, res) {
  req.logout(function (err) {
    if (err) {
      throw new Error(err);
    }
    return res.json(httpResponse(true, "Cerraste sesión"));
  });
}
