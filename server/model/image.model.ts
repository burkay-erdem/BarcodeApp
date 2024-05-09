
import { Sequelize, DataTypes } from 'sequelize'
import { IDb, ModelFunction } from '../../types/sequelize'
import { IImageInstance } from '../../types/model/image.interface'
const Image = (sequelize: Sequelize, PREFIX: string) => {
    const ImageModel = sequelize.define<IImageInstance>('Image', {
        image_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        type: { type: DataTypes.STRING(50), allowNull: false },
        url: { type: DataTypes.STRING(50), allowNull: false },
    }, {
        tableName: PREFIX + 'image',
        // timestamps: false
    })
    const associate = (models: IDb) => {
        console.log('associated ImageModel', )
        ImageModel.belongsToMany(models.Product, { through: models.ProductToImage, foreignKey: 'product_id' })
        ImageModel.hasMany(models.ProductToImage,{ foreignKey: 'image_id' })
    }
    const seed = () => {

    }
    return { model: ImageModel, associate, seed }
}
export default {
    Image,
}