import { Pagination } from "@mui/material";
import { ChangeEvent, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setRange } from "../../../features/pagination/paginationSlice";

type PaginationButtonProps = {};

export const PaginationButton = ({}: PaginationButtonProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => { // set them to page 1 initially
    dispatch(setRange(1));
  }, [])
  const handleClick = (page: number) => {
    dispatch(setRange(page));
  };

  return (
    <>
      <Pagination
        count={10}
        onChange={(event: ChangeEvent<unknown>, page: number) =>
          handleClick(page)
        }
      />
    </>
  );
};
