import { DataTypes } from "sequelize";

const CreateUserRoleJoin = (sequelize) => {
  const UserRoleJoin = sequelize.define("UserRoleJoin", {});
  return UserRoleJoin;
};

export default CreateUserRoleJoin;
