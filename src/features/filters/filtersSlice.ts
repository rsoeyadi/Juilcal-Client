import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    beforeDate: null,
    afterDate: null,
    beforeTime: null,
    afterTime: null,
    day: null,
    performanceType: null,
    musicGenre: null,
    eventFormat: null,
    streaming: null,
    educationalFocus: null,
    miscellaneous: null,
  },
  reducers: {
    setBeforeDate: (state, action) => {
      state.beforeDate = action.payload;
    },
    setAfterDate: (state, action) => {
      state.afterDate = action.payload;
    },
    setBeforeTime: (state, action) => {
      state.beforeTime = action.payload;
    },
    setAfterTime: (state, action) => {
      state.afterTime = action.payload;
    },
    setDay: (state, action) => {
      state.day = action.payload;
    },
    setPerformanceType: (state, action) => {
      state.performanceType = action.payload;
    },
    setMusicGenre: (state, action) => {
      state.musicGenre = action.payload;
    },
    setEventFormat: (state, action) => {
      state.eventFormat = action.payload;
    },
    setStreaming: (state, action) => {
      state.streaming = action.payload;
    },
    setEducationalFocus: (state, action) => {
      state.educationalFocus = action.payload;
    },
    setMiscellaneous: (state, action) => {
      state.miscellaneous = action.payload;
    },
  },
});

export const {
  setBeforeDate,
  setAfterDate,
  setBeforeTime,
  setAfterTime,
  setDay,
  setPerformanceType,
  setMusicGenre,
  setEventFormat,
  setStreaming,
  setEducationalFocus,
  setMiscellaneous,
} = filtersSlice.actions;

export default filtersSlice.reducer;
