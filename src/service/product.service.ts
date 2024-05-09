
import { IProductCreateRequest } from "../../types/request/product.interface";
import { IProductCreateResponse } from "../../types/response/product.interface";
import { apiSlice } from "./api.service";

export const ProductEndpoints = {
  getProductReadList: "product",
  postProductCreateImage: "product/image",

};

export const ProductApiServiceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postProductCreate: builder.mutation<IProductCreateResponse, IProductCreateRequest>(
      {
        query: (data) => ({
          url: ProductEndpoints.getProductReadList,
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
  })
});


export const {
  usePostProductCreateMutation,
  usePostProductCreateImageMutation
} = ProductApiServiceSlice;
