import {
  Filters,
  setAfterDate,
  setAfterTime,
  setBeforeDate,
  setBeforeTime,
  setDay,
  setEducationalFocus,
  setEventFormat,
  setMiscellaneous,
  setMusicGenre,
  setDivision,
  setStreaming,
  setVenue,
} from "../features/filters/filtersSlice";

export type Event = {
  id: string;
  title: string;
  dateTime: string;
  venue: string;
  link: string;
  tags: string;
  imgLink: string;
};

export const reducersMapping = {
  [Filters.BEFORE_DATE]: setBeforeDate,
  [Filters.AFTER_DATE]: setAfterDate,
  [Filters.BEFORE_TIME]: setBeforeTime,
  [Filters.AFTER_TIME]: setAfterTime,
  [Filters.DAY]: setDay,
  [Filters.DIVISION]: setDivision,
  [Filters.MUSIC_GENRE]: setMusicGenre,
  [Filters.EVENT_FORMAT]: setEventFormat,
  [Filters.STREAMING]: setStreaming,
  [Filters.EDUCATIONAL_FOCUS]: setEducationalFocus,
  [Filters.MISCELLANEOUS]: setMiscellaneous,
  [Filters.VENUE]: setVenue,
};

type ReducersMappingType = typeof reducersMapping;
export type ReducersMappingKeys = keyof ReducersMappingType;
