import { DataTypes } from "sequelize";
export default function CreateOrdersModel(sequelize) {
  const Orders = sequelize.define("Orders", {
    order: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
  });

  return Orders;
}
