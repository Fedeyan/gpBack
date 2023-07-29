import { DataTypes } from "sequelize";

export default function CreateOrdersModel(sequelize) {
  const Orders = sequelize.define("Orders", {
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null,
    },
    asked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    order: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
  });

  return Orders;
}
