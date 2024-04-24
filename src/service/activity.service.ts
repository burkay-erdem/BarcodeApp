import { apiSlice } from "./api.service";




export const UserEndpoints = {
  getRead: "user",
};

export const UserApiServiceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserRead: builder.query<IUserReadResponse, IUserReadRequest>(
      {
        query: (data) => ({
          url: UserEndpoints.getRead,
          method: "GET",
          params: data,
        }),
      },
    ),
  })
});

export const {
  useGetUserReadQuery,
} = UserApiServiceSlice;
