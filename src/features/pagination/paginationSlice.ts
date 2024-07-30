import { createSlice } from "@reduxjs/toolkit";

export const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    start: 0,
    stop: 9,
    totalPages: 0,
  },
  reducers: {
    setRange: (state, action) => {
      state.start = action.payload * 9 - 9;
      state.stop = action.payload * 9;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload / 9;
    },
  },
});

export const { setRange } = paginationSlice.actions;

export default paginationSlice.reducer;
