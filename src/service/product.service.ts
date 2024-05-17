
import { IProductCreateRequest, IProductDeleteRequest, IProductReadListRequest } from "../../types/request/product.interface";
import { IProductCreateResponse, IProductDeleteResponse, IProductReadListResponse } from "../../types/response/product.interface";
import { apiSlice } from "./api.service";

export const ProductEndpoints = {
  matchProduct: "product",
  postProductCreateImage: "product/image",

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
  useDeleteProductDeleteMutation
} = ProductApiServiceSlice;
