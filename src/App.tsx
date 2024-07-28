import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Event } from "./app/types";
import { FiltersMenu } from "./app/components/FiltersMenu";
import { SearchBarInput } from "./app/components/SearchBarInput";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [events, setEvents] = useState<Event[] | null>([]);
  const searchValue = useSelector(
    (state: RootState) => state.searchbarValue.searchbarValue
  );

  useEffect(() => {
    getEvents(searchValue);
  }, [searchValue]);

  async function getEvents(searchValue: string | null, filters?: any[]) {
    const { data } = await supabase
      .from("Events")
      .select()
      .ilike("title", `%${searchValue}%`);
    setEvents(data);
  }

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
