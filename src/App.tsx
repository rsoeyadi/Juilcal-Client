import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Event } from "./app/types";
import { FiltersMenu } from "./app/components/FiltersMenu";
import { SearchBarInput } from "./app/components/SearchBarInput";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [events, setEvents] = useState<Event[] | null>([]);

  useEffect(() => {
    getEvents();
  }, []);

  async function getEvents() {
    const { data } = await supabase.from("Events").select();
    setEvents(data);
  }

  return (
    <>
      <SearchBarInput />
      <FiltersMenu events={events} />

      <ul>
        {events?.map((event) => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
