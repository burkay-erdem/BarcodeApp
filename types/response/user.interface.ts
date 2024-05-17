import { IRoleAttributes } from "../model/role.interface";
import { IUser, IUserAttributes } from "../model/user.interface";
import { IBaseResponse, IMessage } from "../system";

export interface IUserRead extends IUserAttributes {
    Roles: IRoleAttributes[]
}
export interface IUserReadList {
    count: number,
    page: number,
    limit: number,
    rows: IUserRead[]
}

export interface IUserReadResponse extends IBaseResponse<IUserRead> {
}

export interface IUserReadListResponse extends IBaseResponse<IUserReadList> {
}

export interface IUserCreateResponse extends IBaseResponse<IUserAttributes> {
}


export interface IUserDeleteResponse extends IBaseResponse<IMessage> {
}





export interface Session extends IUserAttributes {
    accessToken: string
}
export interface IUserAuthResponse extends IBaseResponse<Session> {

}