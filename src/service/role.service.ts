
import { IRoleReadListRequest } from "../../types/request/role.interface";
import { IRoleReadListResponse } from "../../types/response/role.interface";
import { apiSlice } from "./api.service";

export const RoleEndpoints = {
  getRoleReadList: "role",

};

export const RoleApiServiceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoleReadList: builder.query<IRoleReadListResponse, IRoleReadListRequest>(
      {
        query: (data) => ({
          url: RoleEndpoints.getRoleReadList,
          method: "GET",
          params: data,
        }),
      },
    ),
  })
});


export const {
  useGetRoleReadListQuery,
} = RoleApiServiceSlice;
