import { Optional, Model } from 'sequelize';

export interface IProduct {
    name: string;
    barcode: string;
    width: string;
    length: string;
}

export interface IProductIdentity {
    product_id: number;
}

export interface IProductAttributes extends IProductIdentity, IProduct {
}

export interface IProductCreationAttributes extends Optional<IProductAttributes, 'product_id'> { }

export interface IProductInstance extends Model<IProductAttributes, IProductCreationAttributes>, IProductAttributes {
    // Sequelize-generated methods will be declared here (if any)
}





export interface IProductToImageAttributes {
    product_id: number,
    image_id: number,
}

export interface IProductToImageCreationAttributes extends Optional<IProductToImageAttributes, 'image_id' | 'product_id'> { }

export interface IProductToImageInstance extends Model<IProductToImageAttributes, IProductToImageCreationAttributes>, IProductToImageAttributes {
    // Sequelize-generated methods will be declared here (if any)
}
