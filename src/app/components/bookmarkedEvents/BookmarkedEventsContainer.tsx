import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { EventCard } from "../cards/EventCard";
import MenuHeaderCard from "../MenuHeaderCard";
import { Box } from "@mui/material";

export const BookmarkedEventsContainer = () => {
  const bookmarkedEventsIds = useSelector(
    (state: RootState) => state.bookmarks.bookmarkedEvents
  );
  const bookmarkedEvents = useSelector(
    (state: RootState) => state.bookmarks.actualEventsInformation
  );

  return (
    <Box
      sx={{
        padding: "0 1em 2em",
      }}
    >
      <MenuHeaderCard
        iconSrc="./bookmarked-header-icon.svg"
        title="Saved Events"
        description="Here are your bookmarked events. To remove a bookmark, click the bookmark icon on the event."
      />
      <ul>
        <Box
          sx={{
            textAlign: "center",
            color: "#667085",
          }}
        >
          <p>
            {bookmarkedEventsIds.length === 0
              ? "You do not have any bookmarked events."
              : `${bookmarkedEventsIds.length} bookmarked ${
                  bookmarkedEventsIds.length === 1 ? "event" : "events"
                }`}
          </p>
        </Box>

        {bookmarkedEventsIds.map((id: string) => {
          const event = bookmarkedEvents[id];
          if (event) {
            return (
              <Box sx={{ marginBottom: 5 }}>
                <EventCard key={id} event={event} />
              </Box>
            );
          }
          return null;
        })}
      </ul>
    </Box>
  );
};
