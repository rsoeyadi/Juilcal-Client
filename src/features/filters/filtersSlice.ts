import { createSlice } from "@reduxjs/toolkit";

export enum Filters {
  BEFORE_DATE = "Before Date",
  AFTER_DATE = "After Date",
  BEFORE_TIME = "Before Time",
  AFTER_TIME = "After Time",
  DAY = "Day",
  PERFORMANCE_TYPE = "Performance Type",
  MUSIC_GENRE = "Music Genre",
  EVENT_FORMAT = "Event Format",
  STREAMING = "Streaming",
  EDUCATIONAL_FOCUS = "Educational Focus",
  MISCELLANEOUS = "Miscellaneous",
}

interface FiltersState {
  beforeDate: string | null;
  afterDate: string | null;
  beforeTime: string | null;
  afterTime: string | null;
  day: string | null;
  performanceType: string | null;
  musicGenre: string | null;
  eventFormat: string | null;
  streaming: string | null;
  educationalFocus: string | null;
  miscellaneous: string | null;
  queuedUpFilters: Record<string, string | null>;
}

const initialState: FiltersState = {
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
  queuedUpFilters: {},
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
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
    addFilter: (state, action) => {
      if (action.payload.newValue === "None" || !action.payload.newValue) {
        delete state.queuedUpFilters[action.payload.inputType];
      } else {
        state.queuedUpFilters[action.payload.inputType] =
          action.payload.newValue;
      }
    },
    clearFilters: (state) => {
      state.beforeDate = null;
      state.afterDate = null;
      state.beforeTime = null;
      state.afterTime = null;
      state.day = null;
      state.performanceType = null;
      state.musicGenre = null;
      state.eventFormat = null;
      state.streaming = null;
      state.educationalFocus = null;
      state.miscellaneous = null;
      state.queuedUpFilters = {}; // prob not necessary but just because
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
  addFilter,
  clearFilters,
} = filtersSlice.actions;

export type { FiltersState };
export default filtersSlice.reducer;
