import { IProduct, IProductIdentity } from "../model/product.interface";
import { IReadList } from "../system";

export interface IProductReadRequest extends IProductIdentity {
}

export interface IProductReadListRequest extends IReadList {
}

export interface IProductCreateRequest extends IProduct {
}

export interface IProductCreateRequest extends IProduct {
}
export interface IProductImageCreateRequest {
    productId: number;
    file?: File[]
}