import { createClient } from "@supabase/supabase-js";
import { useEffect, useState, useCallback } from "react";
import { Event } from "./app/types";
import { FiltersMenu } from "./app/components/FiltersMenu";
import { SearchBarInput } from "./app/components/SearchBarInput";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import debounce from "lodash.debounce";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [events, setEvents] = useState<Event[] | null>([]);
  const searchValue = useSelector(
    (state: RootState) => state.searchbarValue.searchbarValue
  );
  const filters = useSelector(
    (state: RootState) => state.filters.queuedUpFilters
  );

  const getEvents = useCallback(
    async (searchValue: string | null, filters: any) => {
      let query = supabase.from("Events").select();

      if (searchValue) {
        query = query.ilike("title", `%${searchValue}%`);
      }

      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "None") {
          query = query.or(`tags.ilike.%${value}%, title.ilike.%${value}%`);
        }
      });

      const { data } = await query;
      setEvents(data);
    },
    []
  );

  const debouncedGetEvents = useCallback(debounce(getEvents, 300), [getEvents]); // using useCallback here to ensure that getEvents() is only re-created when its dependencies change

  useEffect(() => {
    debouncedGetEvents(searchValue, filters);
  }, [searchValue, filters, debouncedGetEvents]);

  return (
    <>
      <SearchBarInput />
      <FiltersMenu />

      <ul>
        {events?.map((event) => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
