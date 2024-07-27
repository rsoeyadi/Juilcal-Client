import { configureStore } from "@reduxjs/toolkit";
import searchbarReducer from "../features/search/searchbarSlice"
import filtersReducer from "../features/filters/filtersSlice"

export const store = configureStore({
    reducer: {
        searchbarValue: searchbarReducer,
        filters: filtersReducer
    }
})

export type AppDispatch = typeof store.dispatch // This infers the type of the Redux store's dispatch function, which makes sure that the dispatched actions are correctly typed
export type RootState = ReturnType<typeof store.getState>; // same deal here, but with my state