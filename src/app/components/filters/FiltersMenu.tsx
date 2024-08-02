import { Filters } from "../../../features/filters/filtersSlice";
import { DateTimePickerInput } from "./DateTimePickerInput";
import { DropDownInput } from "./DropDownInput";
import { ModifyButton } from "./ModifyButton";
import { Box } from "@mui/material";
import styles from "./FiltersMenu.module.css";

const dateTimePickerInputs = [
  { title: Filters.BEFORE_DATE, isDatePicker: true },
  { title: Filters.AFTER_DATE, isDatePicker: true },
  { title: Filters.BEFORE_TIME, isDatePicker: false },
  { title: Filters.AFTER_TIME, isDatePicker: false },
];

const dropDownInputs = [
  {
    title: Filters.DAY,
    values: [
      "None",
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
    title: Filters.PERFORMANCE_TYPE,
    values: [
      "None",
      "Opera / Voice",
      "Master Class",
      "Recital",
      "Orchestra",
      "Drama",
      "Dance",
      "Chamber Music",
      "Jazz",
    ],
  },
  {
    title: Filters.MUSIC_GENRE,
    values: ["None", "Classical", "Contemporary / New Work", "Jazz"],
  },
  {
    title: Filters.EVENT_FORMAT,
    values: [
      "None",
      "Live Streaming",
      "Historical Performance",
      "Special Event",
    ],
  },
  {
    title: Filters.STREAMING,
    values: ["None", "Live Streaming"],
  },
  {
    title: Filters.EDUCATIONAL_FOCUS,
    values: ["None", "Master Class", "Preparatory Education"],
  },
  {
    title: Filters.MISCELLANEOUS,
    values: ["None", "Membership Event", "Relaxed Performance", "Free"],
  },
  {
    title: Filters.VENUE,
    values: [
      "None",
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
];

const FiltersMenuHeadingCard = () => {
  return (
    <div className={styles["filters-menu-card"]}>
      <img
        className={styles["filters-menu-card__icon"]}
        src={"./filters-icon.svg"}
        alt="Filter Icon"
      />
      <div className={styles["filters-menu-card__content"]}>
        <p className={styles["filters-menu-card__title"]}>Filter your search</p>
        <p className={styles["filters-menu-card__description"]}>
          Search Juilliard's performance calendar using search terms and
          advanced filters
        </p>
      </div>
    </div>
  );
};

export const FiltersMenu = () => {
  return (
    <Box
      sx={{
        padding: "0 1em",
      }}
    >
      <FiltersMenuHeadingCard />
      {dateTimePickerInputs.map((dateTimePickerInput) => (
        <DateTimePickerInput
          key={dateTimePickerInput.title}
          title={dateTimePickerInput.title}
          isDatePicker={dateTimePickerInput.isDatePicker}
        />
      ))}
      <Box>
        {[...dropDownInputs].map((dropDownInput) => (
          <DropDownInput
            key={dropDownInput.title}
            title={dropDownInput.title}
            values={dropDownInput.values}
          />
        ))}
      </Box>

      <ModifyButton isSaveButton />
      <ModifyButton isSaveButton={false} />
    </Box>
  );
};
