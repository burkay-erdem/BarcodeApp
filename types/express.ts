import { Request as _Request, Response as _Response, NextFunction as _NextFunction } from "express";
import { IBaseResponse, IMessage } from "./system";
import { IUserAttributes } from "./model/user.interface";

export interface Request<IReqBody, IReqParams = {}> extends _Request<IReqParams, undefined, IReqBody, IReqBody> {
    user?: IUserAttributes
}
export interface Response<IRes> extends _Response<IRes> {
}
export interface NextFunction extends _NextFunction {
}


export class __Response__<T = {}> implements IBaseResponse<T> {
    public data: T | null;
    public errorMessages: IMessage[];
    public warningMessages: IMessage[];
    constructor(data?: T) {
        this.data = data ?? null
        this.errorMessages = []
        this.warningMessages = []
    }
}