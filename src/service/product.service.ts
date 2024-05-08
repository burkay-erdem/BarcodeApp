
import { IProductCreateRequest } from "../../types/request/product.interface";
import { IProductCreateResponse } from "../../types/response/product.interface";
import { apiSlice } from "./api.service";

export const ProductEndpoints = {
  getProductReadList: "product",

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
  })
});


export const {
  usePostProductCreateMutation,
} = ProductApiServiceSlice;
