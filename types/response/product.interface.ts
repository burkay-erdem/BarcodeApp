import { IProduct, IProductAttributes } from "../model/product.interface";

export interface IProductReadRequest {
    id: number
}
export interface IProductReadListRequest {
}

export interface IProductCreateRequest extends IProduct {
}