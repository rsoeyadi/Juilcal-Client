import {
  Filters,
  setAfterDate,
  setAfterTime,
  setBeforeDate,
  setBeforeTime,
  setEducationalFocus,
  setEventFormat,
  setMiscellaneous,
  setMusicGenre,
  setPerformanceType,
  setStreaming,
} from "../features/filters/filtersSlice";

export type Event = {
  title: string;
};

export const reducersMapping = {
  [Filters.BEFORE_DATE]: setBeforeDate,
  [Filters.AFTER_DATE]: setAfterDate,
  [Filters.BEFORE_TIME]: setBeforeTime,
  [Filters.AFTER_TIME]: setAfterTime,
  [Filters.PERFORMANCE_TYPE]: setPerformanceType,
  [Filters.MUSIC_GENRE]: setMusicGenre,
  [Filters.EVENT_FORMAT]: setEventFormat,
  [Filters.STREAMING]: setStreaming,
  [Filters.EDUCATIONAL_FOCUS]: setEducationalFocus,
  [Filters.MISCELLANEOUS]: setMiscellaneous,
};

type ReducersMappingType = typeof reducersMapping;
export type ReducersMappingKeys = keyof ReducersMappingType;
