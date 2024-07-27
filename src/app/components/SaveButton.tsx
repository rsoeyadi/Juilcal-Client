import { Dayjs } from "dayjs";
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
} from "../../features/filters/filtersSlice";
import { ReducersMappingKeys } from "../types";

export const SaveButton = () => {
  const handleChange = (
    newValue: Dayjs | string | null,
    inputType: ReducersMappingKeys
  ) => {
    switch (inputType) {
      case Filters.BEFORE_DATE:
        setBeforeDate(newValue);
        break;
      case Filters.AFTER_DATE:
        setAfterDate(newValue);
        break;
      case Filters.BEFORE_TIME:
        setBeforeTime(newValue);
        break;
      case Filters.AFTER_TIME:
        setAfterTime(newValue);
        break;
      case Filters.PERFORMANCE_TYPE:
        setPerformanceType(newValue);
        break;
      case Filters.MUSIC_GENRE:
        setMusicGenre(newValue);
        break;
      case Filters.EVENT_FORMAT:
        setEventFormat(newValue);
        break;
      case Filters.STREAMING:
        setStreaming(newValue);
        break;
      case Filters.EDUCATIONAL_FOCUS:
        setEducationalFocus(newValue);
        break;
      case Filters.MISCELLANEOUS:
        setMiscellaneous(newValue);
        break;
      default:
        break;
    }
  };
};
