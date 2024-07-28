import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import { addFilter } from "../../features/filters/filtersSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { ReducersMappingKeys } from "../types";
import { useState, useEffect } from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";

type DateTimePickerInputProps = {
  title: ReducersMappingKeys;
  isDatePicker: boolean;
};

export const DateTimePickerInput = ({
  title,
  isDatePicker,
}: DateTimePickerInputProps) => {
  const dispatch = useAppDispatch();
  const filterValue = useSelector(
    (state: RootState) => state.filters.queuedUpFilters[title]
  );
  const [value, setValue] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (!filterValue || filterValue === "None") {
      setValue(null);
    } else {
      setValue(dayjs(filterValue));
    }
  }, [filterValue]);
  const handleChange = (
    newValue: Dayjs | string | null,
    inputType: ReducersMappingKeys
  ) => {
    dispatch(addFilter({ newValue, inputType }));
  };

  if (isDatePicker) {
    return (
      <div>
        <DatePicker
          defaultValue={null}
          value={value}
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
        defaultValue={null}
        value={value}
        label={title}
        onChange={(newValue: Dayjs | null) => handleChange(newValue, title)}
      />
    </div>
  );
};
