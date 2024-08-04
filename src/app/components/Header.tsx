import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { RootState } from "../store";
import {
  setIsBookmarkedEventsMenuOpen,
  setIsFilterMenuOpen,
} from "../../features/componentDisplaying/componentDisplaying";
import styles from "./Header.module.css";
import { Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

export const Header = () => {
  const dispatch = useAppDispatch();
  const isOnDesktop = useSelector(
    (state: RootState) => state.componentDisplaying.isOnDesktop
  );

  const isFilterMenuOpen = useSelector(
    (state: RootState) => state.componentDisplaying.isFilterMenuOpen
  );
  const isBookmarkedEventsMenuOpen = useSelector(
    (state: RootState) => state.componentDisplaying.isBookmarkedEventsMenuOpen
  );

  const handleClick = (buttonType: string) => {
    if (buttonType === "filter") {
      dispatch(setIsBookmarkedEventsMenuOpen(false));
      dispatch(setIsFilterMenuOpen(!isFilterMenuOpen));
    } else if (buttonType === "bookmark") {
      dispatch(setIsFilterMenuOpen(false));
      dispatch(setIsBookmarkedEventsMenuOpen(!isBookmarkedEventsMenuOpen));
    } else if (buttonType === "back") {
      dispatch(setIsFilterMenuOpen(false));
      dispatch(setIsBookmarkedEventsMenuOpen(false));
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.header__title}>
        {!isOnDesktop && (isFilterMenuOpen || isBookmarkedEventsMenuOpen) ? (
          <Box
            sx={{
              marginTop: "5px",
            }}
          >
            <IconButton onClick={() => handleClick("back")} aria-label="back">
              <ArrowBackIcon />
            </IconButton>
          </Box>
        ) : (
          <Box
            sx={{
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "30px",
              color: "#0171BB",
            }}
          >
            Juilcal
          </Box>
        )}
      </div>

      <div className={styles["header__button-container"]}>
        <IconButton onClick={() => handleClick("filter")} aria-label="filter">
          {isFilterMenuOpen ? <FilterListOffIcon /> : <FilterListIcon />}
        </IconButton>
        <Box
          sx={{
            marginLeft: "0.7em",
          }}
        >
          <IconButton
            onClick={() => handleClick("bookmark")}
            aria-label="bookmark"
          >
            {isBookmarkedEventsMenuOpen ? (
              <BookmarkIcon />
            ) : (
              <BookmarkBorderIcon />
            )}
          </IconButton>
        </Box>
      </div>
    </div>
  );
};
