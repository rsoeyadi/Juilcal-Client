import { Pagination } from "@mui/material";
import { ChangeEvent } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setRange } from "../../../features/pagination/paginationSlice";

type PaginationButtonProps = {};

export const PaginationButton = ({}: PaginationButtonProps) => {
  const dispatch = useAppDispatch();

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
