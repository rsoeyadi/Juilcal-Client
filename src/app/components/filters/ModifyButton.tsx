import { useSelector } from "react-redux";
import { applySavedFilters, convertFiltersStateToRecord } from "../../utils";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  clearFilters,
  FiltersState,
} from "../../../features/filters/filtersSlice";
import { setCurrentPage } from "../../../features/pagination/paginationSlice";
import { useState } from "react";
import {
  Button,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

type ModifyButtonProps = {
  isSaveButton: boolean;
};

type NotificationSnackbarProps = {
  open: boolean;
  message: string;
  onClose: (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void;
  undoAction?: () => void;
};

const NotificationSnackbar = ({
  open,
  message,
  onClose,
  undoAction,
}: NotificationSnackbarProps) => {
  const action = (
    <React.Fragment>
      {undoAction && (
        <Button color="primary" size="small" onClick={undoAction}>
          Undo
        </Button>
      )}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      message={message}
      action={action}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    />
  );
};

export const ModifyButton = ({ isSaveButton }: ModifyButtonProps) => {
  const dispatch = useAppDispatch();
  const filters = useSelector(
    (state: { filters: FiltersState }) => state.filters
  );
  const [open, setOpen] = useState(false);
  const [previousFilters, setPreviousFilters] = useState<Record<
    string,
    string | null
  > | null>(null);

  const handleClick = (isSaveButton: boolean) => {
    setOpen(true);
    if (isSaveButton) {
      setPreviousFilters(null); // No need to store previous state for saving
      applySavedFilters(filters.queuedUpFilters, dispatch);
    } else {
      setPreviousFilters(convertFiltersStateToRecord(filters)); // Store current state before clearing
      dispatch(clearFilters());
    }
    dispatch(setCurrentPage(1));
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const undoAction = () => {
    if (isSaveButton) {
      dispatch(clearFilters());
    } else if (previousFilters) {
      applySavedFilters(previousFilters, dispatch);
    }
    setOpen(false);
  };

  return (
    <>
      <NotificationSnackbar
        open={open}
        onClose={handleClose}
        message={isSaveButton ? "Filters applied" : "Filters cleared"}
        undoAction={undoAction}
      />
      <Button
        variant="outlined"
        color={isSaveButton ? "primary" : "secondary"}
        onClick={() => handleClick(isSaveButton)}
      >
        {isSaveButton ? "Save Filters" : "Clear Filters"}
      </Button>
    </>
  );
};
