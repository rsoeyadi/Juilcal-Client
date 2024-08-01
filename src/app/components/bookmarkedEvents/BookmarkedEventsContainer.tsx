import { useSelector } from "react-redux";
import { RootState } from "../../store";

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
            <div>
              <h1>{bookmarkedEvents[id].title}</h1>
              <p>{bookmarkedEvents[id].dateTime}</p>
              <p> {bookmarkedEvents[id].venue}</p>
              <p> {bookmarkedEvents[id].link}</p>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
