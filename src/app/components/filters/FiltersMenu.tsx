import { Filters, setEducationalFocus } from "../../../features/filters/filtersSlice";
import { DropDownInput } from "./DropDownInput";
import { ModifyButton } from "./ModifyButton";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import MenuHeaderCard from "../MenuHeaderCard";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

// const dateTimePickerInputs = [
//   { title: Filters.BEFORE_DATE, isDatePicker: true },
//   { title: Filters.AFTER_DATE, isDatePicker: true },
//   { title: Filters.BEFORE_TIME, isDatePicker: false },
//   { title: Filters.AFTER_TIME, isDatePicker: false },
// ];

const dropDownInputs = [
  {
    title: Filters.DAY,
    values: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  {
    title: Filters.VENUE,
    values: [
      "Weill Recital Hall",
      "Room 305 - Ellen and James Marcus Vocal Arts Studio",
      "ARRAY Creative Campus",
      "Holy Trinity Lutheran Church",
      "Glorya Kaufman Dance Studio",
      "Rm 543 - Harris/Woolfson Orchestral Studio",
      "Saint Thomas Church",
      "Rm 309 - Bruno Walter Orchestral Studio",
      "Christ and St. Stephen's Church",
      "David Geffen Hall",
      "Terrace Theater",
      "Blue Note Jazz Club",
      "Stephanie P. McClelland Theater",
      "Morse Recital Hall",
      "The Kennedy Center",
      "Paul Hall",
      "Morse Hall",
      "Carnegie Hall",
      "Dizzy's Club",
      "Kaufman Dance Studio",
      "Merkin Hall",
      "Corpus Christi Church",
      "Alice Tully Hall",
      "Peter Jay Sharp Theater",
      "Woolsey Hall at Yale University",
      "Rosemary and Meredith Willson Theater",
      "Good Shepherd-Faith Presbyterian Church",
      "The Cathedral Church of St. John the Divine",
      "Chelsea Factory",
    ],
  },
  {
    title: Filters.DIVISION,
    values: ["Dance", "Drama", "Classical Music", "Jazz"],
  },
];

export const FiltersMenu = () => {
  const dispatch = useAppDispatch();
  const educationalFocus = useSelector(
    (state: RootState) => state.filters.educationalFocus
  );

  const handleMasterclassChange = (event: { target: { checked: boolean } }) => {
    dispatch(setEducationalFocus(event.target.checked ? "Master Class" : ""));
  };

  return (
    <Box
      sx={{
        padding: "0 1em 2em",
      }}
    >
      <MenuHeaderCard
        iconSrc="./filters-header-icon.svg"
        title="Filter your search"
        description="Click the save button to enable the selected filters."
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridGap: "0.5em",
        }}
      >
        {/* {dateTimePickerInputs.map((dateTimePickerInput) => (
          <DateTimePickerInput
            key={dateTimePickerInput.title}
            title={dateTimePickerInput.title}
            isDatePicker={dateTimePickerInput.isDatePicker}
          />
        ))} */}
      </Box>
      <Box>
        {dropDownInputs.map((dropDownInput) => (
          <DropDownInput
            key={dropDownInput.title}
            title={dropDownInput.title}
            values={dropDownInput.values}
          />
        ))}
      </Box>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={educationalFocus === "Master Class"}
              onChange={handleMasterclassChange}
              name="masterclass"
              color="primary"
            />
          }
          label="Master Class"
        />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridGap: "0.5em",
          marginTop: 2,
        }}
      >
        <ModifyButton isSaveButton />
        <ModifyButton isSaveButton={false} />
      </Box>
    </Box>
  );
};

export default FiltersMenu;