import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import { addFilter } from "../../features/filters/filtersSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { ReducersMappingKeys } from "../types";

type DateTimePickerInputProps = {
  title: ReducersMappingKeys;
  isDatePicker: boolean;
};

export const DateTimePickerInput = ({
  title,
  isDatePicker,
}: DateTimePickerInputProps) => {
  const dispatch = useAppDispatch();

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
          label={title}
          views={["year", "month", "day"]}
          onChange={(newValue: Dayjs | null) => handleChange(newValue, title)}
          slotProps={{
            field: {
              clearable: true,
              onClear: () => {
                handleChange("None", title);
              },
            },
          }}
        />
      </div>
    );
  }
  return (
    <div>
      <TimePicker
        defaultValue={null}
        label={title}
        onChange={(newValue: Dayjs | null) => handleChange(newValue, title)}
      />
    </div>
  );
};
