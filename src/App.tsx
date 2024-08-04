import { createClient } from "@supabase/supabase-js";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";
import { Event } from "./app/types";
import { FiltersMenu } from "./app/components/filters/FiltersMenu";
import { RootState } from "./app/store";
import { useAppDispatch } from "./app/hooks/useAppDispatch";
import {
  setCurrentPage,
  setTotalFilteredEventsCount,
} from "./features/pagination/paginationSlice";
import { setIsOnDesktop } from "./features/componentDisplaying/componentDisplaying";
import { Header } from "./app/components/Header";
import { BookmarkedEventsContainer } from "./app/components/bookmarkedEvents/BookmarkedEventsContainer";
import { PaginationButton } from "./app/components/pagination/PaginationButton";
import { EventCard } from "./app/components/cards/EventCard";
import "./App.css";
import { SearchBarInput } from "./app/components/filters/SearchBarInput";
import { Box, Typography } from "@mui/material";

// Supabase initialization
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [events, setEvents] = useState<Event[] | null>([]);
  const [totalEventsCount, setTotalEventsCount] = useState<
    number | undefined
  >();
  const [totalResultsCount, setTotalResultsCount] = useState<
    number | undefined
  >(0);
  const isFilterMenuOpen = useSelector(
    (state: RootState) => state.componentDisplaying.isFilterMenuOpen
  );
  const isBookmarkedEventsMenuOpen = useSelector(
    (state: RootState) => state.componentDisplaying.isBookmarkedEventsMenuOpen
  );

  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );

  const isOnDesktop = useSelector(
    (state: RootState) => state.componentDisplaying.isOnDesktop
  );

  const dispatch = useAppDispatch();

  const totalFilteredEventsCount = useSelector(
    (state: RootState) => state.pagination.totalFilteredEventsCount
  );
  const searchValue = useSelector(
    (state: RootState) => state.searchbar.searchbarValue
  );
  const paginationValue = useSelector((state: RootState) => state.pagination);
  const filtersSliceValues = useSelector((state: RootState) => state.filters);

  const filtersSliceValuesExcludingQueuedUpFilters = useMemo(() => {
    return Object.entries(filtersSliceValues).filter(
      ([key]) => key !== "queuedUpFilters"
    );
  }, [filtersSliceValues]);

  useEffect(() => {
    setTotalResultsCount(totalEventsCount);
  }, [totalEventsCount]);

  useEffect(() => {
    setTotalResultsCount(totalFilteredEventsCount);
  }, [totalFilteredEventsCount]);

  useEffect(() => {
    if (!isOnDesktop) {
      if (!isFilterMenuOpen) {
        // this shouldn't happen when you click the clear button
        window.scrollTo(0, 0);
      }
    }
  }, [currentPage]);

  useEffect(() => {
    const handleResize = () => {
      dispatch(
        setIsOnDesktop(window.matchMedia("(min-width: 1024px)").matches)
      );
    };

    // Initial check
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const getEvents = useCallback(
    async (searchValue: string | null, filters: any) => {
      let query = supabase.from("Events").select("*", { count: "exact" });

      if (searchValue) {
        query = query.ilike("title", `%${searchValue}%`);
      }

      filters.forEach(([key, value]: [string, string]) => {
        if (value && value !== "None") {
          if (key === "beforeDate") {
            query = query.lte("dateTime", value);
          } else if (key === "afterDate") {
            query = query.gte("dateTime", value);
          } else if (key === "day") {
            query = query.ilike("dayOfWeek", `%${value}%`);
          } else if (key === "venue") {
            query = query.ilike("venue", `%${value}%`);
          } else {
            query = query.or(`tags.ilike.%${value}%, title.ilike.%${value}%`);
          }
        }
      });

      const { data, count } = await query.range(
        paginationValue.start,
        paginationValue.stop
      );
      setEvents(data);
      dispatch(setTotalFilteredEventsCount(count));
    },
    [paginationValue]
  );

  const getCount = useCallback(async () => {
    const { count } = await supabase
      .from("Events")
      .select("*", { count: "exact", head: true });
    setTotalEventsCount(count!);
  }, [paginationValue]);

  const debouncedGetEvents = useCallback(debounce(getEvents, 300), [getEvents]);
  const debouncedGetCount = useCallback(debounce(getCount, 300), [getCount]);

  useEffect(() => {
    debouncedGetEvents(searchValue, filtersSliceValuesExcludingQueuedUpFilters);
    debouncedGetCount();
  }, [
    searchValue,
    filtersSliceValuesExcludingQueuedUpFilters,
    debouncedGetEvents,
    debouncedGetCount,
  ]);

  useEffect(() => {
    debouncedGetCount();
  }, [debouncedGetCount]);

  useEffect(() => {
    // set them to page 1 initially
    dispatch(setCurrentPage(1));
  }, []);

  if (!isOnDesktop) {
    return (
      <>
        <Header />
        {isFilterMenuOpen && <FiltersMenu />}
        {isBookmarkedEventsMenuOpen && <BookmarkedEventsContainer />}
        {!isFilterMenuOpen && !isBookmarkedEventsMenuOpen && (
          <Box
            sx={{
              padding: "0 0.6em",
            }}
          >
            <div className="events__container">
              <SearchBarInput />
              <Box
                sx={{
                  marginTop: '1em',
             
                }}
              >
                {totalResultsCount} results
              </Box>
              <ul>
                {events?.map((event) => (
                  <EventCard event={event} key={event.id} />
                ))}
              </ul>
              <PaginationButton
                totalEventsCount={totalEventsCount}
                filtersSliceValuesExcludingQueuedUpFilters={
                  filtersSliceValuesExcludingQueuedUpFilters
                }
              />
            </div>
          </Box>
        )}
      </>
    );
  }

  return null;
}

export default App;
