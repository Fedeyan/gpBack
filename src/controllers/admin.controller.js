import { Orders, User, UserRole } from "../config/database.js";
import { httpResponse } from "../config/server-config.js";

export async function isAdmin(req, res) {
  try {
    const isAdmin = await UserRole.findOne({
      where: {
        UserId: req?.user?.id,
      },
    });

    return res.json(
      httpResponse(isAdmin?.name === "superadmin" ? true : false)
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function isAdminAction(req, res, next) {
  try {
    const isAdmin = await UserRole.findOne({
      where: {
        UserId: req?.user?.id,
      },
    });

    if (!isAdmin.name === "superadmin") {
      return res.json(httpResponse(false, null, "Sin privilegios."));
    }

    return next();
  } catch (error) {
    throw new Error(error);
  }
}
export async function getAllOrders(req, res) {
  try {
    const result = await Orders.findAll({
      where: {
        asked: true,
      },
      include: {
        model: User,
        attributes: ["nombre"],
      },
    });

    return res.json(result);
  } catch (error) {
    throw new Error(error);
  }
}
