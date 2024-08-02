import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { RootState } from "../store";
import {
  setIsBookmarkedEventsMenuOpen,
  setIsFilterMenuOpen,
} from "../../features/componentDisplaying/componentDisplaying";
import { useState } from "react";

export const Header = () => {
  const dispatch = useAppDispatch();
  const [isLocalFilterMenuOpen, setIsLocalFilterMenuOpen] =
    useState<boolean>(false);
  const [isLocalBookmarkMenuOpen, setIsLocalBookmarkMenuOpen] =
    useState<boolean>(false);

  const isFilterMenuOpen = useSelector(
    (state: RootState) => state.componentDisplaying.isFilterMenuOpen
  );
  const isBookmarkedEventsMenuOpen = useSelector(
    (state: RootState) => state.componentDisplaying.isBookmarkedEventsMenuOpen
  );

  const handleClick = (buttonType: string) => {
    if (buttonType === "filter") {
      setIsLocalBookmarkMenuOpen(false);
      dispatch(setIsBookmarkedEventsMenuOpen(false));

      setIsLocalFilterMenuOpen((prevValue: boolean) => {
        const newValue = !prevValue;
        dispatch(setIsFilterMenuOpen(newValue));
        return newValue;
      });
    } else if (buttonType === "bookmark") {
      setIsLocalFilterMenuOpen(false);
      dispatch(setIsFilterMenuOpen(false));

      setIsLocalBookmarkMenuOpen((prevValue: boolean) => {
        const newValue = !prevValue;
        dispatch(setIsBookmarkedEventsMenuOpen(newValue));
        return newValue;
      });
    } else if (buttonType === "back") {
      setIsLocalFilterMenuOpen(false);
      setIsLocalBookmarkMenuOpen(false);
      dispatch(setIsFilterMenuOpen(false));
      dispatch(setIsBookmarkedEventsMenuOpen(false));
    }
  };

  return (
    <div>
      <div>
        {isFilterMenuOpen || isBookmarkedEventsMenuOpen ? (
          <button onClick={() => handleClick("back")}>
            <img src="./arrow_back.svg" alt="Back arrow" />
          </button>
        ) : (
          "Juilcal"
        )}
      </div>
      <div>
        <button onClick={() => handleClick("filter")}>
          <img src="./filter_list.svg" alt="Filter list" />
        </button>
        <button onClick={() => handleClick("bookmark")}>
          <img src="./bookmark_list.svg" alt="Bookmark list" />
        </button>
      </div>
    </div>
  );
};
