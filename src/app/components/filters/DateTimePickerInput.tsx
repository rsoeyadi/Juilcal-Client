import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { addFilter } from "../../../features/filters/filtersSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { ReducersMappingKeys } from "../../types";
import { useState, useEffect } from "react";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { Box, TextField } from "@mui/material";

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
    const serializedValue = newValue?.toString();
    if (serializedValue) {
      dispatch(addFilter({ serializedValue, inputType }));
    }
  };

  if (isDatePicker) {
    return (
      <Box>
        <DateTimePicker
          defaultValue={null}
          value={value}
          label={title}
          onChange={(newValue: Dayjs | null) => handleChange(newValue, title)}
          format="MM/DD/YYYY"
        />
      </Box>
    );
  }
};
