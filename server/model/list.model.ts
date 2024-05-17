
import { Sequelize, DataTypes } from 'sequelize'
import { IDb } from '../../types/sequelize'
import { IListInstance } from '../../types/model/list.interface'

const List = (sequelize: Sequelize, PREFIX: string) => {
    const ListModel = sequelize.define<IListInstance>('List', {
        list_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(50), allowNull: false }, 
    }, {
        tableName: PREFIX + 'list',
        // timestamps: false
    })
    const associate = (models: IDb) => {
        ListModel.belongsToMany(models.Product, { through: models.ProductToList, foreignKey: 'list_id', otherKey: "product_id" })
        ListModel.hasMany(models.ProductToList,{ foreignKey: 'list_id' })

        ListModel.belongsToMany(models.User, { through: models.UserToList, foreignKey: 'list_id', otherKey: 'user_id' })
        ListModel.hasMany(models.UserToList, { foreignKey: 'list_id' })
    }
    const seed = () => {
    }
    return { model: ListModel, associate, seed }
}
export default {
    List,
}