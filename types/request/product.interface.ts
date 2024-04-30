import { IProductAttributes } from "../model/product.interface";

export interface IProductReadResponse extends IBaseResponse<IProductAttributes> {
}
export interface IProductReadListResponse extends IBaseResponse<IProductAttributes[]> {
}
export interface IProductCreateResponse extends IBaseResponse<IProductAttributes> {
}