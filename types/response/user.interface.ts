import { IUser, IUserAttributes } from "../model/user.interface";
import { IBaseResponse } from "../system";

export interface IUserReadResponse extends IBaseResponse<IUserAttributes> {
}
export interface IUserReadListResponse extends IBaseResponse {
}
export interface IUserCreateResponse extends IBaseResponse<IUserAttributes> {   
}