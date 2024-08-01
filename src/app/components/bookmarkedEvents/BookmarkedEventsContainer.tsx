import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Event } from "../../types";

type BookmarkedEventCardProps = {
  eventId: string;
  bookmarkedEvents: {
    [id: string]: Event;
  };
};

const BookmarkedEventCard = ({
  eventId,
  bookmarkedEvents,
}: BookmarkedEventCardProps) => {
  return (
    <div>
      <h1>{bookmarkedEvents[eventId].title}</h1>
      <p>{bookmarkedEvents[eventId].dateTime}</p>
      <p> {bookmarkedEvents[eventId].venue}</p>
      <p> {bookmarkedEvents[eventId].link}</p>
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
      <h1>BookmarkedEvents</h1>
      <ul>
        {bookmarkedEventsIds.map((id: string) => {
          return (
            <BookmarkedEventCard
              eventId={id}
              bookmarkedEvents={bookmarkedEvents}
            />
          );
        })}
      </ul>
    </div>
  );
};
