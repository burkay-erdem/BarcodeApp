
import { IListReadListRequest} from "../../types/request/list.interface";
import { IListReadListResponse} from "../../types/response/list.interface";
import { apiSlice } from "./api.service";
export const ListEndpoints = {
  getListReadList: "/list",

};

export const ListApiServiceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListReadList: builder.query<IListReadListResponse, IListReadListRequest>(
      {
        query: (data) => ({
          url: ListEndpoints.getListReadList,
          method: "GET",
          params: data,
        }),
      },
    ),

  })
});


export const {
  useGetListReadListQuery,
} = ListApiServiceSlice;
