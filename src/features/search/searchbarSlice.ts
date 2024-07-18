import { createSlice } from "@reduxjs/toolkit";

export const searchbarSlice = createSlice({
    name: 'searchbar',
    initialState: {
        searchbarValue: null
    },
    reducers: {
        setSearchbarValue: (state, action) => state.searchbarValue = action.payload
    }
})

export const { setSearchbarValue } = searchbarSlice.actions

export default searchbarSlice.reducer