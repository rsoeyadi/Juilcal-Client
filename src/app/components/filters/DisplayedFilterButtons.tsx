import { useSelector } from "react-redux";
import { selectFinalFilters } from "../../../features/filters/filtersSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { RootState } from "../../store";
import { Box, Button } from "@mui/material";
import { ReducersMappingKeys, reducersMapping } from "../../types";

type DisplayedFilterButtonProps = {
  filterType: ReducersMappingKeys;
  value: string | null;
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

  return (
    value && (
      <Button
        variant="contained"
        sx={{ margin: 0.3 }}
        onClick={() => handleRemoval(filterType)}
      >
        {`${value} (Remove)`}
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
