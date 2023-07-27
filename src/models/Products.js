import { DataTypes } from "sequelize";

const CreateProductsModel = (sequelize) => {
  const Products = sequelize.define("Products", {
    code: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
    },
    modelo: {
      type: DataTypes.STRING,
    },
    imagen: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  });
  return Products;
};

export default CreateProductsModel;
