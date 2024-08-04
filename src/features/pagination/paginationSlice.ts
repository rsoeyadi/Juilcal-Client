import { createSlice } from "@reduxjs/toolkit";

export const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    start: 0,
    stop: 9,
    totalPages: 0,
    totalFilteredEventsCount: 0,
    currentPage: 1,
  },
  reducers: {
    setTotalPages: (state, action) => {
      state.totalPages = Math.ceil(action.payload / 9);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      state.start = state.currentPage * 9 - 9;
      state.stop = state.currentPage * 9 - 1;
    },
    setTotalFilteredEventsCount: (state, action) => {
      state.totalFilteredEventsCount = action.payload;
    },
  },
});

export const { setCurrentPage, setTotalPages, setTotalFilteredEventsCount } =
  paginationSlice.actions;

export default paginationSlice.reducer;
