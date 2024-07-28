import { useEffect, useState } from "react";
import { addFilter } from "../../features/filters/filtersSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { ReducersMappingKeys } from "../types";
import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type DropDownInputProps = {
  title: ReducersMappingKeys;
  values: string[];
};

export const DropDownInput = ({ title, values }: DropDownInputProps) => {
  const dispatch = useAppDispatch();

  const SelectInputBox = ({ title, values }: DropDownInputProps) => {
    const [value, setValue] = useState<string>("None");
    const filterValue = useSelector(
      (state: RootState) => state.filters.queuedUpFilters[title]
    );
    useEffect(() => {
      if (!filterValue || filterValue === "None") {
        setValue("None");
      } else {
        setValue(filterValue);
      }
    }, [filterValue]);

    const handleChange = (
      event: SelectChangeEvent,
      inputType: ReducersMappingKeys
    ) => {
      const serializedValue = event.target.value as string; // technically not serialized but it's just the same I gave it bc of the date/time (dayjs) being serialized
      setValue(serializedValue);
      dispatch(addFilter({ serializedValue, inputType }));
    };
    return (
      <>
        <InputLabel>{title}</InputLabel>
        <Select
          defaultValue={"None"}
          value={value}
          label={title}
          onChange={(newValue: any) => handleChange(newValue, title)}
        >
          {values.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </>
    );
  };

  return <SelectInputBox title={title} values={values} />;
};
