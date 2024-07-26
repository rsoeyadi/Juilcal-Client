import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { DateTimePickerInput } from "./app/components/DateTimePickerInput";
import { Filters } from "./features/filters/filtersSlice";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [events, setEvents] = useState<any[] | null>([]);

  useEffect(() => {
    getEvents();
  }, []);

  async function getEvents() {
    const { data } = await supabase.from("Events").select();
    setEvents(data);
  }

  return (
    <>
      <DateTimePickerInput title={Filters.BEFORE_DATE} isDatePicker />
      <DateTimePickerInput title={Filters.AFTER_DATE} isDatePicker />
      <DateTimePickerInput title={Filters.BEFORE_TIME} isDatePicker={false} />
      <DateTimePickerInput title={Filters.AFTER_TIME} isDatePicker={false} />
      <ul>
        {events?.map((event) => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
