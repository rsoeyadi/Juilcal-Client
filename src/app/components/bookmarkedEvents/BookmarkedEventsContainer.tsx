import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { EventCard } from "../cards/EventCard";


export const BookmarkedEventsContainer = () => {
  const bookmarkedEventsIds = useSelector(
    (state: RootState) => state.bookmarks.bookmarkedEvents
  );
  const bookmarkedEvents = useSelector(
    (state: RootState) => state.bookmarks.actualEventsInformation
  );

  return (
    <div>
      <h1>Bookmarked Events</h1>
      <ul>
        {bookmarkedEventsIds.map((id: string) => {
          const event = bookmarkedEvents[id];
          if (event) {
            return <EventCard key={id} event={event} />;
          }
          return null;
        })}
      </ul>
    </div>
  );
};
