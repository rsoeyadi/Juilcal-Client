import { useState } from "react";
import { addFilter } from "../../features/filters/filtersSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { ReducersMappingKeys } from "../types";
import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

type DropDownInputProps = {
  title: ReducersMappingKeys;
  values: string[];
};

export const DropDownInput = ({ title, values }: DropDownInputProps) => {
  const dispatch = useAppDispatch();

  const SelectInputBox = ({ title, values }: DropDownInputProps) => {
    const [value, setValue] = useState<string | null>(null);

    const handleChange = (
      event: SelectChangeEvent,
      inputType: ReducersMappingKeys
    ) => {
      const newValue = event.target.value as string;
      setValue(newValue);
      dispatch(addFilter({ newValue, inputType }));
    };
    return (
      <>
        <InputLabel>{title}</InputLabel>
        <Select
          defaultValue={null}
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
