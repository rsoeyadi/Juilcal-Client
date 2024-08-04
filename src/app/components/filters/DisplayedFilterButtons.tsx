import { useSelector } from "react-redux";
import { selectFinalFilters } from "../../../features/filters/filtersSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { RootState } from "../../store";
import { Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReducersMappingKeys, reducersMapping } from "../../types";
import { Filters } from "../../../features/filters/filtersSlice";

type DisplayedFilterButtonProps = {
  filterType: ReducersMappingKeys;
  value: string | null;
};

const getDisplayText = (
  filterType: ReducersMappingKeys,
  value: string | null
) => {
  switch (filterType) {
    case Filters.BEFORE_DATE:
    case Filters.BEFORE_TIME:
      return `Before ${value}`;
    case Filters.AFTER_DATE:
    case Filters.AFTER_TIME:
      return `After ${value}`;
    default:
      return value;
  }
};

const DisplayedFilterButton = ({
  filterType,
  value,
}: DisplayedFilterButtonProps) => {
  const dispatch = useAppDispatch();

  const handleRemoval = (filterType: ReducersMappingKeys) => {
    const action = reducersMapping[filterType];
    if (action) {
      dispatch(action(null));
    }
  };

  const displayText = getDisplayText(filterType, value);

  return (
    value && (
      <Button
        variant="contained"
        sx={{ margin: 0.3 }}
        onClick={() => handleRemoval(filterType)}
        endIcon={<CloseIcon />}
      >
        {displayText}
      </Button>
    )
  );
};

export const DisplayedFilterButtons = () => {
  const finalFilters = useSelector((state: RootState) =>
    selectFinalFilters(state)
  );

  return (
    <Box>
      {Object.entries(finalFilters).map(([filterType, value]) => (
        <DisplayedFilterButton
          key={filterType}
          filterType={filterType as ReducersMappingKeys}
          value={value}
        />
      ))}
    </Box>
  );
};
