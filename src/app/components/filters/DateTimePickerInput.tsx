import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { addFilter } from "../../../features/filters/filtersSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { ReducersMappingKeys } from "../../types";
import { useState, useEffect } from "react";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { formatTitle } from "../../utils"; // Import the utility function

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
    if (!filterValue || filterValue === title) {
      setValue(null);
    } else {
      setValue(dayjs(filterValue));
    }
  }, [filterValue, title]);

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
      <Box sx={{}}>
        <DateTimePicker
          defaultValue={null}
          value={value}
          label={formatTitle(title)} // Format the title
          onChange={(newValue: Dayjs | null) => handleChange(newValue, title)}
          format="MM/DD/YYYY"
          slotProps={{ textField: { fullWidth: true } }}
        />
      </Box>
    );
  }
};
