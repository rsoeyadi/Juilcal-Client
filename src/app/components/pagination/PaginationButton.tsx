import { Pagination } from "@mui/material";
import { ChangeEvent, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  setRange,
  setTotalPages,
} from "../../../features/pagination/paginationSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

// here's a helper function to see if all the filters are cleared or not
const areAllFiltersCleared = (filters: [string, any][]) => {
  return filters.every(([, value]) => value === null);
};

type PaginationButtonProps = {
  totalEventsCount: number | undefined;
  filtersSliceValuesExcludingQueuedUpFilters: [string, any][];
};

export const PaginationButton = ({
  totalEventsCount,
  filtersSliceValuesExcludingQueuedUpFilters,
}: PaginationButtonProps) => {
  const dispatch = useAppDispatch();
  const totalFilteredEventsCount = useSelector(
    (state: RootState) => state.pagination.totalFilteredEventsCount
  );
  const totalPages = useSelector(
    (state: RootState) => state.pagination.totalPages
  );

  useEffect(() => {
    dispatch(
      setTotalPages(
        areAllFiltersCleared(filtersSliceValuesExcludingQueuedUpFilters)
          ? totalEventsCount
          : totalFilteredEventsCount
      )
    );
  });

  useEffect(() => {
    // set them to page 1 initially
    dispatch(setRange(1));
  }, []);

  const handleClick = (page: number) => {
    dispatch(setRange(page));
  };

  return (
    <>
      <Pagination
        count={totalPages}
        onChange={(event: ChangeEvent<unknown>, page: number) =>
          handleClick(page)
        }
      />
    </>
  );
};
