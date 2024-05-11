import { IImageAttributes } from "../model/image.interface";
import { IProduct, IProductAttributes, IProductToImageAttributes } from "../model/product.interface";
import { IBaseResponse, IMessage } from "../system";

export interface IProductRead extends IProductAttributes {
    Images:  IImageAttributes[]
}

export interface IProductReadResponse extends IBaseResponse<IProductRead> {
}

export interface IProductReadListResponse extends IBaseResponse<IProductRead[]> {
}

export interface IProductCreateResponse extends IBaseResponse<IProductAttributes> {
}

export interface IProductImageCreateResponse extends IBaseResponse<IProductToImageAttributes[]> {
}

export interface IProductDeleteResponse extends IBaseResponse<IMessage> {
}

