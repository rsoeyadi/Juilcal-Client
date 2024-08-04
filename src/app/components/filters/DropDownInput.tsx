// DropDownInput.tsx
import { useEffect, useState } from "react";
import { addFilter } from "../../../features/filters/filtersSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { ReducersMappingKeys } from "../../types";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type DropDownInputProps = {
  title: ReducersMappingKeys;
  values: string[];
  className?: string;
};

const SelectInputBox = ({ title, values, className }: DropDownInputProps) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>("");
  const filterValue = useSelector(
    (state: RootState) => state.filters.queuedUpFilters[title]
  );

  useEffect(() => {
    if (!filterValue) {
      setValue("");
    } else {
      setValue(filterValue);
    }
  }, [filterValue]);

  const handleChange = (
    event: SelectChangeEvent,
    inputType: ReducersMappingKeys
  ) => {
    const serializedValue = event.target.value as string;
    setValue(serializedValue);
    dispatch(addFilter({ serializedValue, inputType }));
  };

  return (
    <Box sx={{ minWidth: 120, margin: "1.5em 0" }}>
      <FormControl fullWidth>
        <InputLabel>{title}</InputLabel>
        <Select
          autoWidth
          value={value}
          label={title}
          onChange={(newValue: SelectChangeEvent) =>
            handleChange(newValue, title)
          }
          className={className}
          fullWidth
        >
          <MenuItem value="" disabled>
            <em>Select {title.toLowerCase()}</em>
          </MenuItem>
          {values.map((type) => (
            <MenuItem key={type} value={type}>
              <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                {type}
              </div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export const DropDownInput = ({
  title,
  values,
  className,
}: DropDownInputProps) => {
  return <SelectInputBox title={title} values={values} className={className} />;
};
