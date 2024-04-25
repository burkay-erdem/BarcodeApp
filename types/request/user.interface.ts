import { IUserAttributes } from "../model/user.interface";

export interface IUserReadResponse extends IUserAttributes {
}
export interface IUserReadListResponse  {
    users: IUserAttributes[]
}
export interface IUserCreateResponse extends IUserAttributes {
}