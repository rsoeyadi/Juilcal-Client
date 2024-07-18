import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "../features/filters/filtersSlice"

export default configureStore({
    reducer: {
        filters: filtersReducer
    }
})