import { Optional, Model } from 'sequelize';

//#region Product
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
//#endregion

//#region ProductToImage
export interface IProductToImageAttributes {
    product_id: number,
    image_id: number,
}

export interface IProductToImageCreationAttributes extends Optional<IProductToImageAttributes, 'product_id' | 'image_id'> { }

export interface IProductToImageInstance extends Model<IProductToImageAttributes, IProductToImageCreationAttributes>, IProductToImageAttributes {
    // Sequelize-generated methods will be declared here (if any)
}
//#endregion

//#region ProductToMember
export interface IProductToMemberAttributes {
    product_id: number,
    user_id: number,
    is_received: number,
    is_approved: number,
}

export interface IProductToMemberCreationAttributes extends Optional<IProductToMemberAttributes, 'product_id' | 'user_id'> { }

export interface IProductToMemberInstance extends Model<IProductToMemberAttributes, IProductToMemberCreationAttributes>, IProductToMemberAttributes {
    // Sequelize-generated methods will be declared here (if any)
}
//#endregion


//#region ProductToList
export interface IProductToListAttributes {
    product_id: number,
    list_id: number, 
}

export interface IProductToListCreationAttributes extends Optional<IProductToListAttributes, 'product_id' | 'list_id'> { }

export interface IProductToListInstance extends Model<IProductToListAttributes, IProductToListCreationAttributes>, IProductToListAttributes {
    // Sequelize-generated methods will be declared here (if any)
}
//#endregion
