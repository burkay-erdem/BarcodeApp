import { IListIdentity } from "../model/list.interface";
import { IProduct, IProductIdentity } from "../model/product.interface";
import { IUserIdentity } from "../model/user.interface";
import { IReadList } from "../system";

export interface IProductReadRequest extends IProductIdentity {
}

export interface IProductReadListRequest extends IReadList {
}

export interface IProductCreateRequest extends IProduct {
}
export interface IProductSendToUserRequest extends IProductIdentity, IUserIdentity {
}
export interface IProductSendToListRequest extends IProductIdentity, IListIdentity {
}

export interface IProductCreateRequest extends IProduct {
}
export interface IProductImageCreateRequest {
    productId: number;
    file?: File[]
}

export interface IProductDeleteRequest extends IProductIdentity {
}