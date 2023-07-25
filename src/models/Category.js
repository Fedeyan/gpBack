import { DataTypes } from "sequelize"

const CreateCategoriesModel = (sequelize) =>{
    const Categories = sequelize.define('Categories', {
        nombre:  {
            type: DataTypes.STRING
        }
    })
    return Categories
}

export default CreateCategoriesModel