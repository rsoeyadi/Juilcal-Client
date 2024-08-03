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
  }, [value, dispatch]);

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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 1,
        fontSize: 20,
      }}
    >
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        inputRef={textInputRef}
        onKeyDown={handleKeyPress}
        sx={{
          flex: 1,
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
          "& .MuiInputLabel-root": {
            left: "9px",
          },
          "& .MuiInputLabel-shrink": {
            left: "1px",
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleButtonClick}
        sx={{
          marginLeft: "10px",
          backgroundColor: "#f5f5f5",
          color: "#707070",
          fontSize: "15px",
          padding: "10px 20px",
          borderRadius: "30px",
          border: "none",
          "&:hover": {
            backgroundColor: "#e0e0e0",
            border: "1px solid #c8c8c8",
            color: "#707070",
          },
          "&:focus": {
            border: "1px solid #c8c8c8",
            backgroundColor: "#f5f5f5",
            color: "#707070",
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
};
