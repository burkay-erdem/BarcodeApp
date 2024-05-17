// import { ISequelizeDb, ISequelizeModel } from "../index.interface";

import { ModelOptions, ModelCtor, Model, Sequelize } from "sequelize";

export interface ISequelizeDb {
    sequelize?: Sequelize;
    Sequelize?: typeof ISequelizeModel;
}
export interface ModelFunction {
    model: (sequelize: Sequelize, PREFIX: string) => {
        model: ISequelizeModel;
        associate: (models: IDb) => void;
        seed: () => void;
    }
}

export interface ISequelizeModelOption extends ModelOptions {
    associate: (models: IDb) => void;
    seed: () => void;
}

export interface ISequelizeModel extends ModelCtor<Model> {
    options: ISequelizeInitOption;
}


export type IModelName = 'User'| 'UserToList' | 'Role' | 'Product' | 'ProductToImage' | 'ProductToMember' | 'ProductToList' | 'Image' | 'List'

export type IDbName = {
    [key in IModelName]: ISequelizeModel;
}

export type IDb = IDbName & ISequelizeDb

