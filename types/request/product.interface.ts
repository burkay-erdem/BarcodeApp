import { IProductAttributes } from "../model/product.interface";

export interface IProductReadResponse extends IProductAttributes {
}
export interface IProductReadListResponse  {
    products: IProductAttributes[]
}
export interface IProductCreateResponse extends IProductAttributes {
}