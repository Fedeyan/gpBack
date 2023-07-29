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
    alerts: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: [
        { title: "Titulo", content: "contenido", status: "estado" },
      ],
    },
  });
  return UserData;
};

export default CreateUserdataModel;
