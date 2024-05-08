
import { Sequelize, DataTypes } from 'sequelize'
import { IDb, ModelFunction } from '../../types/sequelize'
import { IUserInstance } from '../../types/model/user.interface'
const User = (sequelize: Sequelize, PREFIX: string) => {
    const UserModel = sequelize.define<IUserInstance>('User', {
        user_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(50), allowNull: false },
        role_id: { type: DataTypes.INTEGER, allowNull: false },
        password: { type: DataTypes.STRING(50), allowNull: false }
    }, {
        tableName: PREFIX + 'user',
        // timestamps: false
    })
    const associate = (models: IDb) => {

    }
    const seed = () => {

    }
    return { model: UserModel, associate, seed }
}
export default {
    User,
}