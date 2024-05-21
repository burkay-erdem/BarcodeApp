import { IImageAttributes } from "../model/image.interface";
import { IProduct, IProductAttributes, IProductToImageAttributes } from "../model/product.interface";
import { IBaseResponse, IMessage } from "../system";

export interface IProductRead extends IProductAttributes {
    Images:  IImageAttributes[]
}
export interface IProductReadList  {
    count: number,
    page: number,
    limit: number,
    rows: IProductRead[]
}

export interface IProductReadResponse extends IBaseResponse<IProductRead> {
}

export interface IProductReadListResponse extends IBaseResponse<IProductReadList> {
}

export interface IProductCreateResponse extends IBaseResponse<IProductAttributes> {
}

export interface IProductSendToUserResponse extends IBaseResponse<IMessage> {
}

export interface IProductSendToListResponse extends IBaseResponse<IMessage> {
}

export interface IProductImageCreateResponse extends IBaseResponse<IProductToImageAttributes[]> {
}

export interface IProductDeleteResponse extends IBaseResponse<IMessage> {
}

