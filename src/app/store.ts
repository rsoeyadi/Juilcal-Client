import { configureStore } from "@reduxjs/toolkit";
import searchbarReducer from "../features/search/searchbarSlice"
import filtersReducer from "../features/filters/filtersSlice"

export default configureStore({
    reducer: {
        searchbarValue: searchbarReducer,
        filters: filtersReducer
    }
})