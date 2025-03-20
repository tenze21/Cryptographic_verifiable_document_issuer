import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
// import { BASE_URL } from "../constants.js";

const baseQuery= fetchBaseQuery({baseUrl: "http://localhost:4000"});

export const apiSlice= createApi({
    baseQuery,
    tagTypes:['nonce', 'verify'],
    endpoints: (builder)=>({}),
})