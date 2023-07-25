import { DataTypes } from "sequelize";

const  CreateUserModel = (sequelize) => {
  const User = sequelize.define("User", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return User;
};

export default CreateUserModel