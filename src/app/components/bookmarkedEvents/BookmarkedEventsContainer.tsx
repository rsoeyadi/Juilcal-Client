import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Event } from "../../types";
import { BookmarkButton } from "../cards/EventCard";
import { formatDate } from "../../utils";

type BookmarkedEventCardProps = {
  event: Event;
};

const BookmarkedEventCard = ({ event }: BookmarkedEventCardProps) => {
  return (
    <div>
      <h1>{event.title}</h1>
      <p>{formatDate(event.dateTime)}</p>
      <p>{event.venue}</p>
      <p>{event.link}</p>
      <BookmarkButton event={event} />
    </div>
  );
};

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
            return <BookmarkedEventCard key={id} event={event} />;
          }
          return null;
        })}
      </ul>
    </div>
  );
};
