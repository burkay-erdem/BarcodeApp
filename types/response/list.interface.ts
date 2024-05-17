import { IImageAttributes } from "../model/image.interface";
import { IList, IListAttributes } from "../model/list.interface";
import { IBaseResponse, IMessage } from "../system";

export interface IListRead extends IListAttributes {
    Images:  IImageAttributes[]
}
export interface IListReadList  {
    count: number,
    page: number,
    limit: number,
    rows: IListRead[]
}

export interface IListReadResponse extends IBaseResponse<IListRead> {
}

export interface IListReadListResponse extends IBaseResponse<IListReadList> {
}

export interface IListCreateResponse extends IBaseResponse<IListAttributes> {
}

export interface IListDeleteResponse extends IBaseResponse<IMessage> {
}

