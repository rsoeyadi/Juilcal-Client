import { createClient } from "@supabase/supabase-js";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";
import { Event } from "./app/types";
import { FiltersMenu } from "./app/components/filters/FiltersMenu";
import { SearchBarInput } from "./app/components/filters/SearchBarInput";
import { RootState } from "./app/store";
import { EventCard } from "./app/components/cards/EventCard";
import { PaginationButton } from "./app/components/pagination/PaginationButton";
import { useAppDispatch } from "./app/hooks/useAppDispatch";
import { setTotalFilteredEventsCount } from "./features/pagination/paginationSlice";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [events, setEvents] = useState<Event[] | null>([]);
  const dispatch = useAppDispatch();
  const [totalEventsCount, setTotalEventsCount] = useState<
    number | undefined
  >();

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

  const getEvents = useCallback(
    async (searchValue: string | null, filters: any) => {
      const table = supabase.from("Events");
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

      const { data, count, error } = await query.range(
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

  return (
    <>
      <SearchBarInput />
      <FiltersMenu />
      <ul>
        {events?.map((event) => (
          <EventCard
            id={event.id}
            title={event.title}
            date={event.dateTime}
            venue={event.venue}
            link={event.link}
          />
        ))}
      </ul>
      <PaginationButton
        totalEventsCount={totalEventsCount}
        filtersSliceValuesExcludingQueuedUpFilters={
          filtersSliceValuesExcludingQueuedUpFilters
        }
      />
    </>
  );
}

export default App;
