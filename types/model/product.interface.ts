import { Optional, Model, DataTypes } from 'sequelize';

export interface IProduct {
    name: string;
    barcode: string;
    width: string;
    length: string;
    height: string;
}
export interface IProductAttributes extends IProduct {
    product_id: number;
}

export interface IProductCreationAttributes extends Optional<IProductAttributes, 'product_id'> { }

export interface IProductInstance extends Model<IProductAttributes, IProductCreationAttributes>, IProductAttributes {
    // Sequelize-generated methods will be declared here (if any)
}
