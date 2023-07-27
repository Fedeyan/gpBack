import { User, UserRole } from "../config/database.js";
import { httpResponse } from "../config/server-config.js";

export async function isAdmin(req, res) {
  try {
    const isAdmin = await UserRole.findOne({
      where: {
        UserId: req?.user?.id,
      },
    });

    return res.json(httpResponse(isAdmin?.name === "superadmin" ? true : false));
  } catch (error) {
    throw new Error(error);
  }
}
