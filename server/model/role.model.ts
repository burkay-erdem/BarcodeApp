
import { Sequelize, DataTypes } from 'sequelize'
import { IDb, ModelFunction } from '../../types/sequelize'
import { IRoleInstance } from '../../types/model/role.interface'
const Role = (sequelize: Sequelize, PREFIX: string) => {
    const RoleModel = sequelize.define<IRoleInstance>('Role', {
        role_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(50), allowNull: false },
    }, {
        tableName: PREFIX + 'role',
        // timestamps: false
    })
    const associate = (models: IDb) => {

    }
    const seed = () => {
        RoleModel.bulkCreate([
            {
                name: 'Muhasebe'
            },
            {
                name: 'Operator'
            },
            {
                name: 'Tedarikçi'
            },
        ])
    }
    return { model: RoleModel, associate, seed }
}
export default {
    Role,
}