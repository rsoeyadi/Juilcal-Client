import { Pagination } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  setCurrentPage,
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
  const searchValue = useSelector(
    (state: RootState) => state.searchbar.searchbarValue
  );
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );

  useEffect(() => {
    dispatch(
      setTotalPages(
        areAllFiltersCleared(filtersSliceValuesExcludingQueuedUpFilters) &&
          !searchValue
          ? totalEventsCount
          : totalFilteredEventsCount
      )
    );
  }, [totalEventsCount, totalFilteredEventsCount]);

  const handleClick = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <>
      <Pagination
        variant="outlined"
        color="primary"
        count={totalPages}
        page={currentPage}
        onChange={(_, page: number) => handleClick(page)}
      />
    </>
  );
};
