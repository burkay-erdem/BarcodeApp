import { Optional, Model, DataTypes } from 'sequelize';

export interface IRole {
    name: string;
}

export interface IRoleAttributes extends IRole {
    role_id: number;
}

export interface IRoleCreationAttributes extends Optional<IRoleAttributes, 'role_id'> { }

export interface IRoleInstance extends Model<IRoleAttributes, IRoleCreationAttributes>, IRoleAttributes {
    // Sequelize-generated methods will be declared here (if any)
}
