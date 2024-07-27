import { Dispatch } from "@reduxjs/toolkit";
import {
  Filters,
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
} from "../features/filters/filtersSlice";

export const applySavedFilters = (
  queuedUpFilters: Record<string, string | null>,
  dispatch: Dispatch<any>
) => {
  Object.entries(queuedUpFilters).forEach(([key, value]) => {
    switch (key) {
      case Filters.BEFORE_DATE:
        dispatch(setBeforeDate(value));
        break;
      case Filters.AFTER_DATE:
        dispatch(setAfterDate(value));
        break;
      case Filters.BEFORE_TIME:
        dispatch(setBeforeTime(value));
        break;
      case Filters.AFTER_TIME:
        dispatch(setAfterTime(value));
        break;
      case Filters.DAY:
        dispatch(setDay(value));
        break;
      case Filters.PERFORMANCE_TYPE:
        dispatch(setPerformanceType(value));
        break;
      case Filters.MUSIC_GENRE:
        dispatch(setMusicGenre(value));
        break;
      case Filters.EVENT_FORMAT:
        dispatch(setEventFormat(value));
        break;
      case Filters.STREAMING:
        dispatch(setStreaming(value));
        break;
      case Filters.EDUCATIONAL_FOCUS:
        dispatch(setEducationalFocus(value));
        break;
      case Filters.MISCELLANEOUS:
        dispatch(setMiscellaneous(value));
        break;
      default:
        break;
    }
  });
};
