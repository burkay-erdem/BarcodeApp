 
import { IUserCreateRequest, IUserReadRequest } from "../../types/request/user.interface";
import { IUserCreateResponse, IUserReadResponse } from "../../types/response/user.interface";
import { apiSlice } from "./api.service";




export const UserEndpoints = {
  getUserRead: "user",
  postUserCreate: "/user/register",

};

export const UserApiServiceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserRead: builder.query<IUserReadResponse, IUserReadRequest>(
      {
        query: (data) => ({
          url: UserEndpoints.getUserRead,
          method: "GET",
          params: data,
        }),
      },
    ),
    postUserCreate: builder.mutation<IUserCreateResponse, IUserCreateRequest>(
      {
        query: (data) => ({
          url: UserEndpoints.postUserCreate,
          method: "POST",
          body: data,
        }),
      },
    ),
  })
});
 

export const {
  useGetUserReadQuery,
  usePostUserCreateMutation
} = UserApiServiceSlice;
