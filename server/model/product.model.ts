
import { Sequelize, DataTypes } from 'sequelize'
import { IDb, ModelFunction } from '../../types/sequelize'
import { IProductInstance, IProductToImageInstance } from '../../types/model/product.interface'
const Product = (sequelize: Sequelize, PREFIX: string) => {
    const ProductModel = sequelize.define<IProductInstance>('Product', {
        product_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(50), allowNull: false },
        barcode: { type: DataTypes.STRING(50), allowNull: false },
        width: { type: DataTypes.STRING(50), allowNull: false },
        length: { type: DataTypes.STRING(50), allowNull: false },
    }, {
        tableName: PREFIX + 'product',
        // timestamps: false
    })
    const associate = (models: IDb) => {
        console.log('associated ProductModel', )

        ProductModel.belongsToMany(models.Image, { through: models.ProductToImage,foreignKey: 'image_id' })
    }
    const seed = () => {

    }
    return { model: ProductModel, associate, seed }
}


const ProductToImage = (sequelize: Sequelize, PREFIX: string) => {
    const ProductToImageModel = sequelize.define<IProductToImageInstance>('ProductToImage', {
        product_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
        image_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      
    }, {
        tableName: PREFIX + 'productToImage',
        // timestamps: false
    })
    const associate = (models: IDb) => { 
        ProductToImageModel.belongsTo(models.Product, { foreignKey: 'product_id' })
        ProductToImageModel.belongsTo(models.Image, { foreignKey: 'image_id' })
    }
    const seed = () => {

    }
    return { model: ProductToImageModel, associate, seed }
}
export default {
    Product,
    ProductToImage
}