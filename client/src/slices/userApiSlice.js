import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants.js";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),
    getNonce: builder.query({
      query:()=>({
        url: `${USERS_URL}/nonce`,
        method: "GET",
        credentials: "include",
      })
    })
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetNonceQuery } = userApiSlice;
