import { Orders, User } from "../config/database.js";
import { httpResponse } from "../config/server-config.js";

export async function addProductToOrder(req, res) {
  try {
    const { product, cant } = req.body;

    const userOrder = await Orders.findOne({
      where: {
        UserId: req?.user?.id,
      },
    });

    const previousOrderStatus = userOrder?.dataValues?.order;
    const nextNumber = Object.keys(previousOrderStatus).length + 1;

    await userOrder.update({
      order: {
        ...previousOrderStatus,
        [nextNumber]: { product, cant, price: null },
      },
    });

    return res.json(httpResponse(true, "Operacion exitosa."));
  } catch (error) {
    throw new Error(error);
  }
}

export async function getOrder(req, res) {
  try {
    const order = await Orders.findOne({
      where: {
        UserId: req?.user?.id,
      },
    });

    return res.json(order.order);
  } catch (error) {
    throw new Error(error);
  }
}
