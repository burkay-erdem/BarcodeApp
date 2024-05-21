
import { IProductCreateRequest, IProductDeleteRequest, IProductReadListRequest, IProductSendToListRequest, IProductSendToUserRequest } from "../../types/request/product.interface";
import { IProductCreateResponse, IProductDeleteResponse, IProductReadListResponse, IProductSendToListResponse, IProductSendToUserResponse } from "../../types/response/product.interface";
import { apiSlice } from "./api.service";

export const ProductEndpoints = {
  matchProduct: "product",
  postProductCreateImage: "product/image",
  postProductSendToUser: "/product/sendToUser",
  postProductSendToList: "/product/sendToList"
};

export const ProductApiServiceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductReadList: builder.query<IProductReadListResponse, IProductReadListRequest>(
      {
        query: (data) => ({
          url: ProductEndpoints.matchProduct,
          method: "GET",
          params: data,

        }),
      },
    ),
    postProductCreate: builder.mutation<IProductCreateResponse, IProductCreateRequest>(
      {
        query: (data) => ({
          url: ProductEndpoints.matchProduct,
          method: "POST",
          body: data,
        }),
      },
    ),
    postProductSendToUser: builder.mutation<IProductSendToUserResponse, IProductSendToUserRequest>(
      {
        query: (data) => ({
          url: ProductEndpoints.postProductSendToUser,
          method: "POST",
          body: data,
        }),
      },
    ),
    postProductSendToList: builder.mutation<IProductSendToListResponse, IProductSendToListRequest>(
      {
        query: (data) => ({
          url: ProductEndpoints.postProductSendToList,
          method: "POST",
          body: data,
        }),
      },
    ),
    postProductCreateImage: builder.mutation<IProductCreateResponse, IProductCreateRequest | FormData>(
      {
        query: (data) => ({
          url: ProductEndpoints.postProductCreateImage,
          method: "POST",
          body: data,
          headers: {
            'Content-Type': undefined //'multipart/form-data;'
          },
          formData: true
        }),
      },
    ),
    deleteProductDelete: builder.mutation<IProductDeleteResponse, IProductDeleteRequest>(
      {
        query: (data) => ({
          url: ProductEndpoints.matchProduct + '/' + data.product_id ,
          method: "DELETE",
        }),
      },
    ),
  })
});


export const {
  useGetProductReadListQuery,
  usePostProductCreateMutation,
  usePostProductCreateImageMutation,
  usePostProductSendToUserMutation,
  usePostProductSendToListMutation,
  useDeleteProductDeleteMutation
} = ProductApiServiceSlice;
