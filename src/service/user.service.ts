import { IUserReadResponse } from "../../types/request/user.interface";
import { IUserReadRequest } from "../../types/response/user.interface";
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
    postUserCreate: builder.mutation<IUserReadResponse, IUserReadRequest>(
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
