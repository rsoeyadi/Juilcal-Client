import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setSearchbarValue } from "../../features/search/searchbarSlice";

export const SearchBarInput = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>("");
  const textInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(setSearchbarValue(value));
  }, [value]);

  const handleButtonClick = () => {
    if (textInputRef.current) {
      setValue(textInputRef.current.value);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && textInputRef.current) {
      setValue(textInputRef.current.value);
    }
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        inputRef={textInputRef}
        onKeyDown={handleKeyPress}
      />
      <Button variant="contained" onClick={handleButtonClick}>
        Search
      </Button>
    </div>
  );
};
