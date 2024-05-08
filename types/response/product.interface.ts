import { IProduct } from "../model/product.interface";
import { IBaseResponse } from "../system";

export interface IProductReadResponse {
    id: number
}
export interface IProductReadListResponse {
}

export interface IProductCreateResponse extends IBaseResponse<IProduct> {
}