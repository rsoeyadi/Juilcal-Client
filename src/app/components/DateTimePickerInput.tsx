import dayjs from "dayjs";
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

type DateTimePickerInputProps = {
  title: string;
  isDatePicker: boolean;
};

const reducersMapping = {
  [Filters.BEFORE_DATE]: setBeforeDate,
  [Filters.AFTER_DATE]: setAfterDate,
  [Filters.BEFORE_TIME]: setBeforeTime,
  [Filters.AFTER_TIME]: setAfterTime,
};

const today = dayjs();

export const DateTimePickerInput = ({
  title,
  isDatePicker,
}: DateTimePickerInputProps) => {
  const dispatch = useAppDispatch()
  
  if (isDatePicker) {
    return (
      <div>
        <DatePicker
          defaultValue={today}
          label={title}
          views={["year", "month", "day"]}
          onChange={() => {
            dispatch(reducersMapping[ title ])
          }}
        />
      </div>
    );
  }
  return (
    <div>
      <TimePicker defaultValue={today} label={title} />
    </div>
  );
};
