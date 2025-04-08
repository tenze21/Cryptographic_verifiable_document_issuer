import { apiSlice } from "./apiSlice";

export const marksheetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMarksheet: builder.mutation({
      query: (data) => ({
        url: `/api/marksheet/get?indexNo=${data.indexNo}&dob=${data.dob}`,
        method: "POST",
      }),
    }),
  }),
});
export const { useGetMarksheetMutation } = marksheetApiSlice;