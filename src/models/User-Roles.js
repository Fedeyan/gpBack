import { DataTypes } from "sequelize";
import { UserPermissions, guestPermissions } from "../config/server-config.js";

const CreateUserRolesModel = (sequelize) => {
  const UserRoles = sequelize.define("UserRole", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });
  return UserRoles;
};

export default CreateUserRolesModel;
