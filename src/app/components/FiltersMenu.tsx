import { Filters } from "../../features/filters/filtersSlice";
import { DateTimePickerInput } from "./DateTimePickerInput";
import { DropDownInput } from "./DropDownInput";

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
];

export const FiltersMenu = () => {
  return (
    <>
      {dateTimePickerInputs.map((dateTimePickerInput) => (
        <DateTimePickerInput
          key={dateTimePickerInput.title} 
          title={dateTimePickerInput.title}
          isDatePicker={dateTimePickerInput.isDatePicker}
        />
      ))}
      {dropDownInputs.map((dropDownInput) => (
        <DropDownInput
          key={dropDownInput.title} 
          title={dropDownInput.title}
          values={dropDownInput.values}
        />
      ))}
    </>
  );
};
