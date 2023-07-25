import { config } from "dotenv";
import { Sequelize } from "sequelize";
import CreateUserModel from "../models/User.js";
import CreateUserdataModel from "../models/User-Data.js";
import CreateProductsModel from "../models/Products.js";
import CreateCategoriesModel from "../models/Category.js";
import ProductsCategoriesModel from "../models/ProductsCategories.js";
config();

const { SESSION_SECRET, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } =
  process.env;

const sequelize = new Sequelize({
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  dialect: "postgres",
  logging: false,
});

CreateUserModel(sequelize);
CreateUserdataModel(sequelize);
CreateProductsModel(sequelize);
CreateCategoriesModel(sequelize)
ProductsCategoriesModel(sequelize)


export const { User, UserData, Products, Categories, ProductsCategories } = sequelize.models;
console.log(sequelize.models)

UserData.belongsTo(User);
User.hasOne(UserData);
Products.belongsToMany(Categories, {through: "ProductsCategories"})
Categories.belongsToMany(Products, {through: "ProductsCategories"})


export default sequelize;
