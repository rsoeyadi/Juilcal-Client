import { Box, Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setSearchbarValue } from "../../../features/search/searchbarSlice";

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
      <Box
        sx={{
          px: 2,
          justifyContent: "normal",
          fontSize: 20,
          color: "blue",
          margin: 1,
          borderWidth: "10px",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          inputRef={textInputRef}
          onKeyDown={handleKeyPress}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
              "& fieldset": {
                borderWidth: "2px",
              },
              "&:hover fieldset": {
                borderColor: "gray",
              },
              "&.Mui-focused fieldset": {
                borderColor: "blue",
              },
            },
            "& .MuiInputBase-input": {
              padding: "16px 14px",
            },
          }}
        />
      </Box>
      <Button variant="contained" onClick={handleButtonClick}>
        Search
      </Button>
    </div>
  );
};
