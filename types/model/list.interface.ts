import { Model, Optional } from "sequelize";


//#region List

export interface IList {
    name: string;
}
export interface IListIdentity {
    list_id: number;
}
export interface IListAttributes extends IListIdentity, IList {
}
export interface IListCreationAttributes extends Optional<IListAttributes, 'list_id'> { }

export interface IListInstance extends Model<IListAttributes, IListCreationAttributes>, IListAttributes {
    // Sequelize-generated methods will be declared here (if any)
}
//#endregion