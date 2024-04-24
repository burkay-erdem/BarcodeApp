import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from '@env'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
    prepareHeaders: (headers, { endpoint, extra, type, getState }) => {
      // const stateAccessToken = (getState() as RootState).auth.user?.accessToken;
      // if (stateAccessToken) {
      //   headers.set("authorization", `Bearer ${stateAccessToken}`);
      // }

      // const accessToken = getCookie(CookieTypes.accessToken);
      // if (accessToken) {
      //   headers.set("authorization", `Bearer ${accessToken}`);
      // }

      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
      if (headers.get("Content-Type") === "formData") {
        headers.delete("Content-Type");
      }

      return headers;
    },
    paramsSerializer: (params) => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null || value !== "") {
          if (Array.isArray(value)) {
            value.forEach((value) => searchParams.append(key, value));
          } else {
            searchParams.append(key, value as string);
          }
        }
      });
      return searchParams.toString();
    },
  }),
  // extractRehydrationInfo(action, { reducerPath }) {
  //   if (action.type === HYDRATE) {
  //     return (action.payload as any)[reducerPath];
  //   }
  // },
  tagTypes: [],

  endpoints: (builder) => ({
    // omitted
  }),
});
