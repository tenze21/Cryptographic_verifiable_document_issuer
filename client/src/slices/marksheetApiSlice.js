import { apiSlice } from "./apiSlice";
import { MARKSHEET_URL } from "../constants";

export const marksheetApiSlice= apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        createMarksheet: builder.mutation({
            query: (data)=>({
                url: `${MARKSHEET_URL}`,
                method: "POST",
                body: data,
            })
        })
    })
});
export const { useCreateMarksheetMutation }= marksheetApiSlice;