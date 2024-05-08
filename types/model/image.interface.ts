import { Optional, Model } from 'sequelize';

export interface IImage {
    type: string;
    url: string;
}

export interface IImageIdentity {
    image_id: number;
}

export interface IImageAttributes extends IImageIdentity, IImage {
}

export interface IImageCreationAttributes extends Optional<IImageAttributes, 'image_id'> { }

export interface IImageInstance extends Model<IImageAttributes, IImageCreationAttributes>, IImageAttributes {
    // Sequelize-generated methods will be declared here (if any)
}
