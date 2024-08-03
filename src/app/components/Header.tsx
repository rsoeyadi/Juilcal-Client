import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { RootState } from "../store";
import {
  setIsBookmarkedEventsMenuOpen,
  setIsFilterMenuOpen,
} from "../../features/componentDisplaying/componentDisplaying";
import styles from "./Header.module.css";
import { Box } from "@mui/material";

export const Header = () => {
  const dispatch = useAppDispatch();

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
        {isFilterMenuOpen || isBookmarkedEventsMenuOpen ? (
          <Box
            sx={{
              marginTop: "5px",
            }}
          >
            <button
              onClick={() => handleClick("back")}
              className={`${styles.header__button} ${styles["header__button--back"]}`}
            >
              <img src="./arrow_back.svg" alt="Back arrow" />
            </button>
          </Box>
        ) : (
          "Juilcal"
        )}
      </div>
      <div className={styles["header__button-container"]}>
        <button
          onClick={() => handleClick("filter")}
          className={styles.header__button}
        >
          <img src="./filter_list.svg" alt="Filter list" />
        </button>
        <Box
          sx={{
            marginLeft: "0.7em",
          }}
        >
          <button
            onClick={() => handleClick("bookmark")}
            className={styles.header__button}
          >
            <img
              src={
                isBookmarkedEventsMenuOpen
                  ? "/bookmark-filled.svg"
                  : "/bookmark.svg"
              }
              alt="Icon"
            />
          </button>
        </Box>
      </div>
    </div>
  );
};
