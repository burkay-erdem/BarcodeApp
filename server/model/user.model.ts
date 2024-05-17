
import { Sequelize, DataTypes } from 'sequelize'
import { IDb } from '../../types/sequelize'
import { IUserInstance, IUserToListInstance } from '../../types/model/user.interface'
const User = (sequelize: Sequelize, PREFIX: string) => {
    const UserModel = sequelize.define<IUserInstance>('User', {
        user_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(50), allowNull: false },
        email: { type: DataTypes.STRING(50), allowNull: false },
        role_id: { type: DataTypes.INTEGER, allowNull: false },
        password: { type: DataTypes.STRING(100), allowNull: false }
    }, {
        tableName: PREFIX + 'user',
        // timestamps: false
    })
    const associate = (models: IDb) => {
        UserModel.belongsToMany(models.List, { through: models.UserToList, foreignKey: 'user_id', otherKey: 'list_id' })
        UserModel.hasMany(models.UserToList, { foreignKey: 'user_id' })
    }
    const seed = () => {

    }
    return { model: UserModel, associate, seed }
}

const UserToList = (sequelize: Sequelize, PREFIX: string) => {
    const UserToListModel = sequelize.define<IUserToListInstance>('UserToList', {
        user_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
        list_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    }, {
        tableName: PREFIX + 'userToList',
        // timestamps: false
    })
    const associate = (models: IDb) => {
        UserToListModel.belongsTo(models.User, { foreignKey: 'user_id' })
        UserToListModel.belongsTo(models.List, { foreignKey: 'list_id' })
    }
    const seed = () => {

    }
    return { model: UserToListModel, associate, seed }
}

export default {
    User,
    UserToList
}