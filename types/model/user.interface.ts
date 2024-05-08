import { Optional, Model, DataTypes } from 'sequelize';

export interface IUser {
    name: string;
    role_id: number;
    password: string;
}

export interface IUserIdentity {
    user_id: number;
}

export interface IUserAttributes extends IUserIdentity, IUser {
}

export interface IUserCreationAttributes extends Optional<IUserAttributes, 'user_id'> { }

export interface IUserInstance extends Model<IUserAttributes, IUserCreationAttributes>, IUserAttributes {
    // Sequelize-generated methods will be declared here (if any)
}
