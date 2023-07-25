import { DataTypes } from "sequelize";

const CreateUserdataModel = (sequelize) => {
  const UserData = sequelize.define("UserData", {
    verificado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    codigosTemporales: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  });
  return UserData;
};

export default CreateUserdataModel;
