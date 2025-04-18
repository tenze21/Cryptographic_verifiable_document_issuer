import {configureStore} from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import marksheetReducer from "./slices/marksheetSlice";

const store= configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        marksheet: marksheetReducer,
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;