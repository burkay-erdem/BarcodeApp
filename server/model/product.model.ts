
import { Sequelize, DataTypes } from 'sequelize'
import { IDb } from '../../types/sequelize'
import { IProductInstance, IProductToImageInstance, IProductToListInstance, IProductToMemberInstance } from '../../types/model/product.interface'
const Product = (sequelize: Sequelize, PREFIX: string) => {
    const ProductModel = sequelize.define<IProductInstance>('Product', {
        product_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(50), allowNull: false },
        barcode: { type: DataTypes.STRING(50), allowNull: false },
        width: { type: DataTypes.STRING(50), allowNull: false },
        length: { type: DataTypes.STRING(50), allowNull: false },
        created_by: { type: DataTypes.INTEGER, allowNull: false },
    }, {
        tableName: PREFIX + 'product',
        // timestamps: false
    })
    const associate = (models: IDb) => {
        console.log('product models associated: ');

        ProductModel.belongsToMany(models.Image, { through: models.ProductToImage, foreignKey: 'product_id', otherKey: 'image_id' })
        ProductModel.hasMany(models.ProductToImage, { foreignKey: 'product_id' })

        ProductModel.belongsToMany(models.List, { through: models.ProductToList, foreignKey: 'product_id', otherKey: 'list_id' })
        ProductModel.hasMany(models.ProductToList, { foreignKey: 'product_id' })

        ProductModel.belongsToMany(models.User, { through: models.ProductToMember, foreignKey: 'product_id', otherKey: 'user_id' })
        ProductModel.hasMany(models.ProductToMember, { foreignKey: 'product_id' })

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
        console.log('product image models associated: ');
        ProductToImageModel.belongsTo(models.Product, { foreignKey: 'product_id' })
        ProductToImageModel.belongsTo(models.Image, { foreignKey: 'image_id' })
    }
    const seed = () => {

    }
    return { model: ProductToImageModel, associate, seed }
}


const ProductToMember = (sequelize: Sequelize, PREFIX: string) => {
    const ProductToMemberModel = sequelize.define<IProductToMemberInstance>('ProductToMember', {
        product_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
        is_received: { type: DataTypes.BOOLEAN, allowNull: false },
        is_approved: { type: DataTypes.BOOLEAN, allowNull: false },
    }, {
        tableName: PREFIX + 'productToMember',
        // timestamps: false
    })
    const associate = (models: IDb) => {
        ProductToMemberModel.belongsTo(models.Product, { foreignKey: 'product_id' })
        ProductToMemberModel.belongsTo(models.User, { foreignKey: 'user_id' })
    }
    const seed = () => {

    }
    return { model: ProductToMemberModel, associate, seed }
}

const ProductToList = (sequelize: Sequelize, PREFIX: string) => {
    const ProductToListModel = sequelize.define<IProductToListInstance>('ProductToList', {
        product_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
        list_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    }, {
        tableName: PREFIX + 'productToList',
        // timestamps: false
    })
    const associate = (models: IDb) => {
        ProductToListModel.belongsTo(models.Product, { foreignKey: 'product_id' })
        ProductToListModel.belongsTo(models.List, { foreignKey: 'list_id' })
    }
    const seed = () => {

    }
    return { model: ProductToListModel, associate, seed }
}
export default {
    Product,
    ProductToImage,
    ProductToMember,
    ProductToList
}