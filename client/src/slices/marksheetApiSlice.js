import { apiSlice } from "./apiSlice";
import { MARKSHEET_URL } from "../constants";

export const marksheetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMarksheet: builder.mutation({
      query: (data) => ({
        url: `${MARKSHEET_URL}`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    getUnCompiledNumber: builder.query({
      query: () => ({
        url: `${MARKSHEET_URL}`,
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["marksheet"],
    }),
    compileMarksheets: builder.mutation({
      query: () => ({
        url: `${MARKSHEET_URL}/compile`,
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["marksheet"],
    }),
    updateMarksheet: builder.mutation({
      query: (data) => ({
        url: `${MARKSHEET_URL}/update`,
        method: "PATCH",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["marksheet"],
    }),
  }),
});
export const {
  useCreateMarksheetMutation,
  useGetUnCompiledNumberQuery,
  useCompileMarksheetsMutation,
  useUpdateMarksheetMutation,
} = marksheetApiSlice;
