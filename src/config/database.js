import { config } from "dotenv";
import { Sequelize } from "sequelize";
import CreateUserModel from "../models/User.js";
import CreateUserdataModel from "../models/User-Data.js";
import CreateProductsModel from "../models/Products.js";
import CreateCategoriesModel from "../models/Category.js";
import ProductsCategoriesModel from "../models/ProductsCategories.js";
import CreateUserRolesModel from "../models/User-Roles.js";
import CreateUserRoleJoin from "../models/User-Role-Join.js";
import CreateOrdersModel from "../models/Orders.js";
config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;
const sequelize = new Sequelize(URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});

CreateUserModel(sequelize);
CreateUserdataModel(sequelize);
CreateProductsModel(sequelize);
CreateCategoriesModel(sequelize);
ProductsCategoriesModel(sequelize);
CreateUserRolesModel(sequelize);
CreateUserRoleJoin(sequelize);
CreateOrdersModel(sequelize);

export const {
  User,
  UserData,
  Products,
  Categories,
  ProductsCategories,
  UserRole,
  UserRoleJoin,
  Orders,
} = sequelize.models;

console.log(sequelize.models);

UserData.belongsTo(User);
User.hasOne(UserData);
Products.belongsToMany(Categories, { through: "ProductsCategories" });
Categories.belongsToMany(Products, { through: "ProductsCategories" });
User.hasOne(UserRole);
UserRole.belongsToMany(User, {
  foreignKey: "UserRoleId",
  through: "UserRoleJoin",
});
User.hasOne(Orders);
Orders.belongsTo(User);
export default sequelize;
