import { Box, Pagination } from "@mui/material";
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
    <Box
      my={2}
      display="flex"
      justifyContent="center"
      sx={{
        width: "100%",
      }}
    >
      <Pagination
        color="primary"
        shape="rounded"
        count={totalPages}
        page={currentPage}
        onChange={(_, page: number) => handleClick(page)}
        siblingCount={0} // number of page items to show before and after the current page
        boundaryCount={1} // the number of page items to show at the start and end of the pagination
        sx={{
          "& .MuiPagination-ul": {
            justifyContent: "center",
          },
        }}
      />
    </Box>
  );
};
