import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import {
  Filters,
  setAfterDate,
  setAfterTime,
  setBeforeDate,
  setBeforeTime,
} from "../../features/filters/filtersSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useState } from "react";

const reducersMapping = {
  [Filters.BEFORE_DATE]: setBeforeDate,
  [Filters.AFTER_DATE]: setAfterDate,
  [Filters.BEFORE_TIME]: setBeforeTime,
  [Filters.AFTER_TIME]: setAfterTime,
};

type ReducersMappingType = typeof reducersMapping;
type ReducersMappingKeys = keyof ReducersMappingType;

type DateTimePickerInputProps = {
  title: ReducersMappingKeys;
  isDatePicker: boolean;
};

export const DateTimePickerInput = ({
  title,
  isDatePicker,
}: DateTimePickerInputProps) => {
  const [beforeDate, setBeforeDate] = useState<Dayjs | null>(null);
  const [afterDate, setAfterDate] = useState<Dayjs | null>(null);
  const [beforeTime, setBeforeTime] = useState<Dayjs | null>(null);
  const [afterTime, setAfterTime] = useState<Dayjs | null>(null);

  const today = dayjs();
  const dispatch = useAppDispatch();

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

    if (newValue) {
      dispatch(reducersMapping[title](newValue));
    }
  };

  if (isDatePicker) {
    return (
      <div>
        <DatePicker
          defaultValue={today}
          value={title === Filters.BEFORE_DATE ? beforeDate : afterDate}
          label={title}
          views={["year", "month", "day"]}
          onChange={(newValue: Dayjs | null) => handleChange(newValue, title)}
        />
      </div>
    );
  }
  return (
    <div>
      <TimePicker
        defaultValue={today}
        value={title === Filters.BEFORE_TIME ? beforeTime : afterTime}
        label={title}
        onChange={(newValue: Dayjs | null) => handleChange(newValue, title)}
      />
    </div>
  );
};
