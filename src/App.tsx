import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { DateTimePickerInput } from "./app/components/DateTimePickerInput";

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
      <DateTimePickerInput title="Before Date" isDatePicker />
      <DateTimePickerInput title="After Date" isDatePicker />
      <DateTimePickerInput title="Before Time" isDatePicker={false} />
      <DateTimePickerInput title="After Time" isDatePicker={false} />
      <ul>
        {events?.map((event) => (
          <li key={event.title}>{event.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
