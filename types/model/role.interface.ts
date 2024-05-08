import { Optional, Model } from 'sequelize';

export interface IRole {
    name: string;
}

export interface IRoleIdentity {
    role_id: number;
}

export interface IRoleAttributes extends IRoleIdentity, IRole {
}

export interface IRoleCreationAttributes extends Optional<IRoleAttributes, 'role_id'> { }

export interface IRoleInstance extends Model<IRoleAttributes, IRoleCreationAttributes>, IRoleAttributes {
    // Sequelize-generated methods will be declared here (if any)
}
