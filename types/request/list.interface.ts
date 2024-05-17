import { IList, IListIdentity } from "../model/list.interface";
import { IReadList } from "../system";

export interface IListReadRequest extends IListIdentity {
}

export interface IListReadListRequest extends IReadList {
}

export interface IListCreateRequest extends IList {
}

export interface IListCreateRequest extends IList {
}
export interface IListImageCreateRequest {
    ListId: number;
    file?: File[]
}

export interface IListDeleteRequest extends IListIdentity {
}