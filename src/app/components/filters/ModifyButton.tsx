import { useSelector } from "react-redux";
import { applySavedFilters } from "../../filterUtils";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  clearFilters,
  FiltersState,
} from "../../../features/filters/filtersSlice";
import Button from "@mui/material/Button/Button";
import { setCurrentPage } from "../../../features/pagination/paginationSlice";

type ModifyButtonProps = {
  isSaveButton: boolean;
};

export const ModifyButton = ({ isSaveButton }: ModifyButtonProps) => {
  const dispatch = useAppDispatch();
  const queuedUpFilters = useSelector(
    // useSelector subscribes to the store and re-renders so we should use this instead of store.getState()...
    (state: { filters: FiltersState }) => state.filters.queuedUpFilters
  );
  const handleClick = (isSaveButton: boolean) => {
    if (isSaveButton) {
      applySavedFilters(queuedUpFilters, dispatch);
    } else {
      dispatch(clearFilters());
    }
    dispatch(setCurrentPage(1));
  };
  if (isSaveButton) {
    return (
      <Button variant="outlined" onClick={() => handleClick(true)}>
        Save
      </Button>
    );
  }

  return (
    <Button variant="outlined" onClick={() => handleClick(false)}>
      Clear
    </Button>
  );
};
