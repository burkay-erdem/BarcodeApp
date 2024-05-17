import { IUser, IUserIdentity } from "../model/user.interface";
import { IReadList } from "../system";
 
export interface IUserReadRequest extends IUserIdentity {
}

export interface IUserReadListRequest extends IReadList {
}

export interface IUserCreateRequest extends IUser {
}

export interface IUserCreateRequest extends IUser {
}
export interface IUserImageCreateRequest {
    UserId: number;
    file?: File[]
}

export interface IUserDeleteRequest extends IUserIdentity {
}

export interface IUserAuthRequest  {
    username: string;
    password: string;
}