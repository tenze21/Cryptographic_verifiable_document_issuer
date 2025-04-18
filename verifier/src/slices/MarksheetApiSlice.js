import { apiSlice } from "./apiSlice";

export const marksheetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMarksheet: builder.mutation({
      query: (data) => ({
        url: `/api/marksheet/get?indexNo=${data.indexNo}&dob=${data.dob}`,
        method: "POST",
      }),
    }),
    validateTargetHash: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("marksheet", file);
        return {
          url: "/api/marksheet/verify/targetHash",
          method: "POST",
          body: formData,
        };
      },
    }),
    checkMerkleRootOnChain: builder.mutation({
      query: (data) => ({
        url: "/api/marksheet/verify/onchain",
        method: "POST",
        body: data,
      }),
    }),
    validateMerkleRoot: builder.mutation({
      query: (data) => ({
        url: "/api/marksheet/verify/root",
        method: "POST",
        body: data,
      }),
    }),
    validateSignature: builder.mutation({
      query: (data) => ({
        url: "/api/marksheet/verify/signature",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const {
  useGetMarksheetMutation,
  useCheckMerkleRootOnChainMutation,
  useValidateMerkleRootMutation,
  useValidateSignatureMutation,
  useValidateTargetHashMutation,
} = marksheetApiSlice;
