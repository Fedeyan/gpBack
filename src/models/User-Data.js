import { DataTypes } from "sequelize"

const  CreateUserdataModel = (sequelize)=>{
    const UserData = sequelize.define("UserData", {
        verificado: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        codigosTemporales: {
            type: DataTypes.INTEGER,
        }
    })
    return UserData
}

export default CreateUserdataModel