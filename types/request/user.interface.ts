import { IUser } from "../model/user.interface";

export interface IUserReadRequest {
    id: number;
}

export interface IUserReadListRequest {
}

export interface IUserCreateRequest extends IUser {
}