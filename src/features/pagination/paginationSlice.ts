import { createSlice } from "@reduxjs/toolkit";

export const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    start: 0,
    stop: 9,
    totalPages: 0,
    totalFilteredEventsCount: 0,
  },
  reducers: {
    setRange: (state, action) => {
      state.start = action.payload * 9 - 9;
      state.stop = action.payload * 9;
    },
    setTotalPages: (state, action) => {
      state.totalPages = Math.floor(action.payload / 9);
    },
    setTotalFilteredEventsCount: (state, action) => {
      state.totalFilteredEventsCount = action.payload;
    },
  },
});

export const { setRange, setTotalPages, setTotalFilteredEventsCount } =
  paginationSlice.actions;

export default paginationSlice.reducer;
