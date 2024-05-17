import { Optional, Model } from 'sequelize';

//#region User
export interface IUser {
    name: string;
    email: string;
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
//#endregion

//#region UserToList
export interface IUserToListAttributes {
    user_id: number,
    list_id: number, 
}

export interface IUserToListCreationAttributes extends Optional<IUserToListAttributes, 'user_id' | 'list_id'> { }

export interface IUserToListInstance extends Model<IUserToListAttributes, IUserToListCreationAttributes>, IUserToListAttributes {
    // Sequelize-generated methods will be declared here (if any)
}
//#endregion
