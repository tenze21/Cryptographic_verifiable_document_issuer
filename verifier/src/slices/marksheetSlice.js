import { createSlice } from "@reduxjs/toolkit";
const initialState= {
  data: null,
};

const marksheetSlice = createSlice({
  name: "marksheet",
  initialState,
  reducers: {
    setMarksheet: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setMarksheet } = marksheetSlice.actions;
export default marksheetSlice.reducer;