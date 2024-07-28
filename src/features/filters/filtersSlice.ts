import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

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
  VENUE = "Venue",
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
      state.afterDate = action.payload;
    },
    setBeforeTime: (state, action) => {
      if (action.payload === "None") {
        delete state.queuedUpFilters[Filters.BEFORE_TIME];
        state.beforeTime = null;
      } else {
        state.beforeTime = action.payload;
      }
    },
    setAfterTime: (state, action) => {
      if (action.payload === "None") {
        delete state.queuedUpFilters[Filters.AFTER_TIME];
        state.afterTime = null;
      } else {
        state.afterTime = action.payload;
      }
    },
    setDay: (state, action) => {
      if (action.payload === "None") {
        delete state.queuedUpFilters[Filters.DAY];
        state.day = null;
      } else {
        state.day = action.payload;
      }
    },
    setPerformanceType: (state, action) => {
      if (action.payload === "None") {
        delete state.queuedUpFilters[Filters.PERFORMANCE_TYPE];
        state.performanceType = null;
      } else {
        state.performanceType = action.payload;
      }
    },
    setMusicGenre: (state, action) => {
      if (action.payload === "None") {
        delete state.queuedUpFilters[Filters.MUSIC_GENRE];
        state.musicGenre = null;
      } else {
        state.musicGenre = action.payload;
      }
    },
    setEventFormat: (state, action) => {
      if (action.payload === "None") {
        delete state.queuedUpFilters[Filters.EVENT_FORMAT];
        state.eventFormat = null;
      } else {
        state.eventFormat = action.payload;
      }
    },
    setStreaming: (state, action) => {
      if (action.payload === "None") {
        delete state.queuedUpFilters[Filters.STREAMING];
        state.streaming = null;
      } else {
        state.streaming = action.payload;
      }
    },
    setEducationalFocus: (state, action) => {
      if (action.payload === "None") {
        delete state.queuedUpFilters[Filters.EDUCATIONAL_FOCUS];
        state.educationalFocus = null;
      } else {
        state.educationalFocus = action.payload;
      }
    },
    setMiscellaneous: (state, action) => {
      if (action.payload === "None") {
        delete state.queuedUpFilters[Filters.MISCELLANEOUS];
        state.miscellaneous = null;
      } else {
        state.miscellaneous = action.payload;
      }
    },
    setVenue: (state, action) => {
      if (action.payload === "None") {
        delete state.queuedUpFilters[Filters.VENUE];
        state.venue = null;
      } else {
        state.venue = action.payload;
      }
    },
    addFilter: (state, action) => {
      if (!action.payload.newValue) {
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
