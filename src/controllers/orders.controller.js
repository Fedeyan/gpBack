import { validationResult } from "express-validator";
import { Orders, Products, User } from "../config/database.js";
import { httpResponse } from "../config/server-config.js";
import { Op } from "sequelize";
export async function addProductToOrder(req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json(
        errors.array().map((e) => {
          return {
            msg: e.msg,
            path: e.path,
          };
        })
      );
    }

    const { product, cant } = req.body;

    const userOrder = await Orders.findOne({
      where: {
        UserId: req?.user?.id,
      },
    });

    const previousOrderStatus = userOrder?.dataValues?.order;
    const prevOrder = [];

    for (let order in previousOrderStatus) {
      prevOrder.push(previousOrderStatus[order]);
    }

    await userOrder.update({
      order: [...prevOrder, { product, cant, price: null }],
    });

    req.io.emit("fetchOrder");
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

    const idContainer = order?.order;

    if (!Array.isArray(idContainer)) {
      return res.json(httpResponse(false, "Aun no hiciste ningun pedido."));
    }

    const ids = idContainer?.map((p) => p.product);

    let products = [];

    for (let i = 0; i < ids.length; i++) {
      const currentProduct = await Products.findOne({
        where: { code: ids[i] },
      });
      products.push(currentProduct.dataValues);
    }

    products = products.map((product) => {
      const code = product.code;
      const productAddData = idContainer.find((x) => {
        return x.product === Number(code);
      });
      return {
        cant: productAddData.cant,
        price: productAddData.price,
        ...product,
      };
    });

    return res.json({ status: order.status, products });
  } catch (error) {
    throw new Error(error);
  }
}
