import { Strategy as LocalStrategy } from "passport-local";
import { User } from "./database.js";
import { Op } from "sequelize";

const LocalAuth = new LocalStrategy(async function (username, password, cb) {
  try {
    const user = await User.findOne({
      where: {
        correo: username,
      },
    });
    if (!user) {
      return cb(null, false, { message: "El usuario no existe." });
    }

    if (password !== user.contraseña) {
      return cb(null, false, { message: "La contraseñas es incorrecta." });
    }

    return cb(null, { id: user.id }, { message: "Inicio de sesion exitoso" });
  } catch (error) {
    cb(error);
    throw new Error(error);
  }
});

export default LocalAuth;
