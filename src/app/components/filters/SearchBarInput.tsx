import { Box, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setSearchbarValue } from "../../../features/search/searchbarSlice";
import { setCurrentPage } from "../../../features/pagination/paginationSlice";

export const SearchBarInput = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>("");
  const textInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(setSearchbarValue(value));
  }, [value, dispatch]);

  // const handleButtonClick = () => {
  //   if (textInputRef.current) {
  //     dispatch(setCurrentPage(1));
  //     setValue(textInputRef.current.value);
  //   }
  // };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && textInputRef.current) {
      dispatch(setCurrentPage(1));
      setValue(textInputRef.current.value);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        marginTop: 4,
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
        }}
      />
      {/* <Button
        variant="contained"
        onClick={handleButtonClick}
        sx={{
          marginLeft: "10px",
          backgroundColor: "#0171BB",
          color: "#fff",
          fontSize: "12px",
          padding: "10px 20px",
          borderRadius: "30px",
          "&:hover": {
            backgroundColor: "#005f8b",
          },
          "&:focus": {
            backgroundColor: "#0171BB",
          },
        }}
      >
        Search
      </Button> */}
    </Box>
  );
};
