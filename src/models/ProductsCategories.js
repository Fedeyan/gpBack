import { DataTypes } from "sequelize";

const ProductsCategoriesModel = (sequelize) => {
  const ProductsCategories = sequelize.define("ProductsCategories", {});
  return ProductsCategories;
};

export default ProductsCategoriesModel;
