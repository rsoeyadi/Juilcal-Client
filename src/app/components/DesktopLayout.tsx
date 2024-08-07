import {
  Box,
  Drawer,
  FormControl,
  FormLabel,
  Switch,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { BookmarkedEventsContainer } from "./bookmarkedEvents/BookmarkedEventsContainer";
import { EventCard } from "./cards/EventCard";
import { DisplayedFilterButtons } from "./filters/DisplayedFilterButtons";
import FiltersMenu from "./filters/FiltersMenu";
import { SearchBarInput } from "./filters/SearchBarInput";
import { Header } from "./Header";
import { PaginationButton } from "./pagination/PaginationButton";
import { Event } from "../types";
import {
  setIsFilterMenuOpen,
  setIsBookmarkedEventsMenuOpen,
} from "../../features/componentDisplaying/componentDisplaying";

type DesktopLayoutProps = {
  events: Event[] | null;
  totalResultsCount: number | undefined;
  totalEventsCount: number | undefined;
  filtersSliceValuesExcludingQueuedUpFilters: [string, string][];
  handleSwitchClick: () => void;
  isSortedByDescending: boolean;
};

const DesktopLayout: React.FC<DesktopLayoutProps> = ({
  events,
  totalResultsCount,
  totalEventsCount,
  filtersSliceValuesExcludingQueuedUpFilters,
  handleSwitchClick,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const isFilterMenuOpen = useSelector(
    (state: RootState) => state.componentDisplaying.isFilterMenuOpen
  );
  const isBookmarkedEventsMenuOpen = useSelector(
    (state: RootState) => state.componentDisplaying.isBookmarkedEventsMenuOpen
  );

  const toggleFilterMenu = (open: boolean) => () => {
    dispatch(setIsFilterMenuOpen(open));
  };

  const toggleBookmarkedEventsMenu = (open: boolean) => () => {
    dispatch(setIsBookmarkedEventsMenuOpen(open));
  };

  const getGridTemplateColumns = () => {
    if (isSmallScreen) {
      return "repeat(1, 1fr)";
    } else if (isMediumScreen) {
      return "repeat(2, 1fr)";
    } else if (isLargeScreen) {
      return "repeat(3, 1fr)";
    }
    return "repeat(3, 1fr)";
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 3,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "1200px", marginX: "auto", minHeight: '100vh'}}>
        <Header />
        <Box>
          <SearchBarInput />
          <Box sx={{ marginTop: "1em" }}>
            <Box
              component="p"
              sx={{ display: "inline-block", marginTop: "0.5em" }}
            >
              {totalResultsCount} results
            </Box>
            <Box
              sx={{
                float: "right",
              }}
            >
              <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend">Sort desc.</FormLabel>
                <Switch onChange={handleSwitchClick} />
              </FormControl>
            </Box>
          </Box>
          <DisplayedFilterButtons />
          <Box
            display="grid"
            gridTemplateColumns={getGridTemplateColumns()}
            gap={2}
            marginTop={3}
          >
            {events?.map((event) => (
              <Box key={event.id}>
                <EventCard event={event} />
              </Box>
            ))}
          </Box>
          <PaginationButton
            totalEventsCount={totalEventsCount}
            filtersSliceValuesExcludingQueuedUpFilters={
              filtersSliceValuesExcludingQueuedUpFilters
            }
          />
        </Box>
        <Drawer
          anchor="left"
          open={isFilterMenuOpen}
          onClose={toggleFilterMenu(false)}
        >
          <FiltersMenu />
        </Drawer>
        <Drawer
          anchor="right"
          open={isBookmarkedEventsMenuOpen}
          onClose={toggleBookmarkedEventsMenu(false)}
        >
          <BookmarkedEventsContainer />
        </Drawer>
      </Box>
    </Box>
  );
};

export default DesktopLayout;