import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:4000" });

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});
