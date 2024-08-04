// filtersSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export enum Filters {
  BEFORE_DATE = "beforeDate",
  AFTER_DATE = "afterDate",
  BEFORE_TIME = "beforeTime",
  AFTER_TIME = "afterTime",
  DAY = "day",
  PERFORMANCE_TYPE = "performanceType",
  MUSIC_GENRE = "musicGenre",
  EVENT_FORMAT = "eventFormat",
  STREAMING = "streaming",
  EDUCATIONAL_FOCUS = "educationalFocus",
  MISCELLANEOUS = "miscellaneous",
  VENUE = "venue",
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
  venue: string | null;
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
  venue: null,
  queuedUpFilters: {},
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setBeforeDate: (state, action) => {
      if (action.payload === null) {
        delete state.queuedUpFilters[Filters.BEFORE_DATE];
        state.beforeDate = null;
      } else {
        state.beforeDate = action.payload;
      }
    },
    setAfterDate: (state, action) => {
      if (action.payload === null) {
        delete state.queuedUpFilters[Filters.AFTER_DATE];
        state.afterDate = null;
      } else {
        state.afterDate = action.payload;
      }
    },
    setBeforeTime: (state, action) => {
      if (action.payload === Filters.BEFORE_TIME) {
        delete state.queuedUpFilters[Filters.BEFORE_TIME];
        state.beforeTime = null;
      } else {
        state.beforeTime = action.payload;
      }
    },
    setAfterTime: (state, action) => {
      if (action.payload === Filters.AFTER_TIME) {
        delete state.queuedUpFilters[Filters.AFTER_TIME];
        state.afterTime = null;
      } else {
        state.afterTime = action.payload;
      }
    },
    setDay: (state, action) => {
      if (action.payload === Filters.DAY) {
        delete state.queuedUpFilters[Filters.DAY];
        state.day = null;
      } else {
        state.day = action.payload;
      }
    },
    setPerformanceType: (state, action) => {
      if (action.payload === Filters.PERFORMANCE_TYPE) {
        delete state.queuedUpFilters[Filters.PERFORMANCE_TYPE];
        state.performanceType = null;
      } else {
        state.performanceType = action.payload;
      }
    },
    setMusicGenre: (state, action) => {
      if (action.payload === Filters.MUSIC_GENRE) {
        delete state.queuedUpFilters[Filters.MUSIC_GENRE];
        state.musicGenre = null;
      } else {
        state.musicGenre = action.payload;
      }
    },
    setEventFormat: (state, action) => {
      if (action.payload === Filters.EVENT_FORMAT) {
        delete state.queuedUpFilters[Filters.EVENT_FORMAT];
        state.eventFormat = null;
      } else {
        state.eventFormat = action.payload;
      }
    },
    setStreaming: (state, action) => {
      if (action.payload === Filters.STREAMING) {
        delete state.queuedUpFilters[Filters.STREAMING];
        state.streaming = null;
      } else {
        state.streaming = action.payload;
      }
    },
    setEducationalFocus: (state, action) => {
      if (action.payload === Filters.EDUCATIONAL_FOCUS) {
        delete state.queuedUpFilters[Filters.EDUCATIONAL_FOCUS];
        state.educationalFocus = null;
      } else {
        state.educationalFocus = action.payload;
      }
    },
    setMiscellaneous: (state, action) => {
      if (action.payload === Filters.MISCELLANEOUS) {
        delete state.queuedUpFilters[Filters.MISCELLANEOUS];
        state.miscellaneous = null;
      } else {
        state.miscellaneous = action.payload;
      }
    },
    setVenue: (state, action) => {
      if (action.payload === Filters.VENUE) {
        delete state.queuedUpFilters[Filters.VENUE];
        state.venue = null;
      } else {
        state.venue = action.payload;
      }
    },
    addFilter: (state, action) => {
      if (!action.payload.serializedValue) {
        delete state.queuedUpFilters[action.payload.inputType];
      } else {
        state.queuedUpFilters[action.payload.inputType] =
          action.payload.serializedValue;
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
      state.venue = null;
      state.queuedUpFilters = {}; // prob not necessary but just because
    },
  },
});

export const selectFinalFilters = (state: RootState) => {
  const { queuedUpFilters, ...finalFilters } = state.filters;
  return finalFilters;
};

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
  setVenue,
  addFilter,
  clearFilters,
} = filtersSlice.actions;

export type { FiltersState };
export default filtersSlice.reducer;
