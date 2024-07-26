import { Dayjs } from "dayjs";
import {
  Filters,
  setAfterDate,
  setAfterTime,
  setBeforeDate,
  setBeforeTime,
} from "../../features/filters/filtersSlice";
import { ReducersMappingKeys } from "../types";

export const SaveButton = () => {
  const handleChange = (
    newValue: Dayjs | null,
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
      default:
        break;
    }
  };
};
