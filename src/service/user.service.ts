
import { IUserAuthRequest, IUserCreateRequest, IUserReadRequest } from "../../types/request/user.interface";
import { IUserAuthResponse, IUserCreateResponse, IUserReadResponse } from "../../types/response/user.interface";
import { apiSlice } from "./api.service";
export const UserEndpoints = {
  getUserRead: "user",
  postUserCreate: "/user/register",
  postUserLogin: "/user/login",

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
    postUserLogin: builder.mutation<IUserAuthResponse, IUserAuthRequest>(
      {
        query: (data) => ({
          url: UserEndpoints.postUserLogin,
          method: "POST",
          body: data,
        }),
      },
    ),
  })
});


export const {
  useGetUserReadQuery,
  usePostUserCreateMutation,
  usePostUserLoginMutation
} = UserApiServiceSlice;
