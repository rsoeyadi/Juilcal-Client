import { Filters, setAfterDate, setAfterTime, setBeforeDate, setBeforeTime } from "../features/filters/filtersSlice";

export type Event = {
  title: string;
};

export const reducersMapping = {
  [Filters.BEFORE_DATE]: setBeforeDate,
  [Filters.AFTER_DATE]: setAfterDate,
  [Filters.BEFORE_TIME]: setBeforeTime,
  [Filters.AFTER_TIME]: setAfterTime,
};

type ReducersMappingType = typeof reducersMapping;
export type ReducersMappingKeys = keyof ReducersMappingType;