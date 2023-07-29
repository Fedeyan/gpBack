import { UserData } from "../config/database.js";

export async function getAlerts(req, res) {
  try {
    const userdata = await UserData.findOne({
      where: {
        UserId: req?.user?.id,
      },
    });

    if (!userdata) {
      return res.status(500).json("Error en el servidor.");
    }

    return res.json(userdata?.alerts);
  } catch (error) {
    throw new Error(error);
  }
}
