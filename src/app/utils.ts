import { Dispatch } from "@reduxjs/toolkit";
import {
  Filters,
  setBeforeDate,
  setAfterDate,
  setBeforeTime,
  setAfterTime,
  setDay,
  setPerformanceType,
  setMusicGenre,
  setEventFormat,
  setStreaming,
  setEducationalFocus,
  setMiscellaneous,
  setVenue,
  FiltersState,
} from "../features/filters/filtersSlice";
import { DateTime } from "luxon";

export const applySavedFilters = (
  queuedUpFilters: Record<string, string | null>,
  dispatch: Dispatch<any>
) => {
  Object.entries(queuedUpFilters).forEach(([key, value]) => {
    switch (key) {
      case Filters.BEFORE_DATE:
        dispatch(setBeforeDate(value));
        break;
      case Filters.AFTER_DATE:
        dispatch(setAfterDate(value));
        break;
      case Filters.BEFORE_TIME:
        dispatch(setBeforeTime(value));
        break;
      case Filters.AFTER_TIME:
        dispatch(setAfterTime(value));
        break;
      case Filters.DAY:
        dispatch(setDay(value));
        break;
      case Filters.PERFORMANCE_TYPE:
        dispatch(setPerformanceType(value));
        break;
      case Filters.MUSIC_GENRE:
        dispatch(setMusicGenre(value));
        break;
      case Filters.EVENT_FORMAT:
        dispatch(setEventFormat(value));
        break;
      case Filters.STREAMING:
        dispatch(setStreaming(value));
        break;
      case Filters.EDUCATIONAL_FOCUS:
        dispatch(setEducationalFocus(value));
        break;
      case Filters.MISCELLANEOUS:
        dispatch(setMiscellaneous(value));
        break;
      case Filters.VENUE:
        dispatch(setVenue(value));
        break;
      default:
        break;
    }
  });
};

export const formatDate = (dateTime: string) => {
  let eventDateTime = DateTime.fromISO(dateTime, { zone: "utc" });

  // Check if the event date is in daylight savings and adjust the hours... should fix this later on bc it's hacky
  const isDST = eventDateTime.setZone("America/New_York").isInDST;

  const hoursToAdd = isDST ? 4 : 5;

  const adjustedDateTime = eventDateTime.plus({ hours: hoursToAdd });

  const localDateTime = adjustedDateTime
    .setZone("America/New_York")
    .toFormat("cccc, LLL dd, yyyy, h:mma");

  return localDateTime;
};

const venuePhotos: { [key: string]: string } = {
  "Morse Recital Hall": "./venue-photos/morse-hall.jpg",
  "Saint Thomas Church": "./venue-photos/saint-thomas-church.jpg",
  "Weill Recital Hall": "./venue-photos/Weill-Recital-Hall.jpg",
  "Rm 309 - Bruno Walter Orchestral Studio": "./venue-photos/309.jpg",
  "Christ and St. Stephen's Church": "./venue-photos/christ-st-stephen.jpg",
  "Room 305 - Ellen and James Marcus Vocal Arts Studio":
    "./venue-photos/503.jpg",
  "David Geffen Hall": "./venue-photos/david-geffen.jpg",
  "ARRAY Creative Campus": "./venue-photos/juilliard.jpg",
  "Kaufman Dance Studio": "./venue-photos/kaufman-dance.jpg",
  "Terrace Theater, The Kennedy Center": "./venue-photos/kennedy.jpg",
  "Merkin Hall": "./venue-photos/merkin-hall.jpg",
  "Corpus Christi Church": "./venue-photos/corpus-christi-church.jpg",
  "Paul Hall": "./venue-photos/paul-hall.jpg",
  "Alice Tully Hall": "./venue-photos/alice-tully-hall.jpg",
  "Peter Jay Sharp Theater": "./venue-photos/peter-jay-sharp.jpg",
  "Morse Hall": "./venue-photos/morse-hall.jpg",
  "Carnegie Hall": "./venue-photos/carnegie-hall.jpg",
  "Dizzy's Club": "./venue-photos/dizzys-club.jpg",
  "Woolsey Hall at Yale University": "./venue-photos/woolsey-hall-yale.jpg",
  "Holy Trinity Lutheran Church": "./venue-photos/holy-trinity-church.jpg",
  "Blue Note Jazz Club": "./venue-photos/blue-note.jpg",
  "Rosemary and Meredith Willson Theater":
    "./venue-photos/rosemary-meredith-willson-theater.jpg",
  "Stephanie P. McClelland Theater": "./venue-photos/juilliard.jpg",
  "Good Shepherd-Faith Presbyterian Church":
    "./venue-photos/good-shepherd-faith.jpg",
  "The Cathedral Church of St. John the Divine":
    "./venue-photos/st-john-divine.jpg",
  "Glorya Kaufman Dance Studio": "./venue-photos/kaufman-dance.jpg",
  "Chelsea Factory": "./venue-photos/chelsea-factory.jpg",
  "Rm 543 - Harris/Woolfson Orchestral Studio": "./venue-photos/juilliard.jpg",
};

export const getVenuePhoto = (venue: string | null): string => {
  return venue ? venuePhotos[venue] || "juilliard.jpg" : "juilliard.jpg";
};

export const formatTitle = (title: string) => {
  return title
    .replace(/([A-Z])/g, " $1") // Add a space before each uppercase letter
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
};

export const convertFiltersStateToRecord = (
  filtersState: FiltersState
): Record<string, string | null> => {
  const { queuedUpFilters, ...rest } = filtersState;
  return { ...queuedUpFilters, ...rest } as Record<string, string | null>;
};
