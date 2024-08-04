import { useAppDispatch } from "../../hooks/useAppDispatch";
import { RootState } from "../../store";
import {
  addEvent,
  removeEvent,
} from "../../../features/bookmarking/bookmarkingSlice";
import { useSelector } from "react-redux";
import { Event } from "../../types";
import { formatDate, getVenuePhoto } from "../../utils";
import { Box, IconButton } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

type EventCardProps = {
  event: Event;
};

type BookmarkButtonProps = {
  event: Event;
};

export const BookmarkButton = ({ event }: BookmarkButtonProps) => {
  const dispatch = useAppDispatch();
  const bookmarks = useSelector(
    (state: RootState) => state.bookmarks.bookmarkedEvents
  );

  const bookmarked = bookmarks.includes(event.id);

  const handleClick = () => {
    if (bookmarked) {
      dispatch(removeEvent(event));
    } else {
      dispatch(addEvent(event));
    }
  };

  return (
    <IconButton onClick={handleClick} aria-label="bookmark">
      {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
    </IconButton>
  );
};

export const EventCard = ({ event }: EventCardProps) => {
  const venuePhoto = getVenuePhoto(event.venue);

  return (
    <Box
      sx={{
        marginBottom: "2.5em",
      }}
    >
      <Box
        component="img"
        src={venuePhoto}
        alt={event.venue || "Default venue"}
        sx={{
          width: "100%",
          height: "auto",
          marginTop: "1em",
          borderRadius: "12px",
          maxHeight: "350px",
        }}
      />
      <Box
        component="h1"
        sx={{
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: "24px",
          lineHeight: "30px",
        }}
      >
        {event.title}
      </Box>
      <Box
        component="p"
        sx={{
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "20px",
          color: "#474C58",
          marginBottom: "0",
        }}
      >
        {formatDate(event.dateTime)}
      </Box>
      <Box
        component="p"
        sx={{
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "20px",
          color: "#999FAA",
          flex: "none",
          order: 1,
          alignSelf: "stretch",
          flexGrow: 0,
          width: "349px",
          height: "20px",
          margin: "0.2em 0 0",
        }}
      >
        {event.venue}
      </Box>
      <Box
        sx={{
          marginTop: "1em",
          position: "relative",
        }}
      >
        <Box
          component="a"
          href={event.link}
          target="__blank"
          sx={{
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "20px",
            color: "#474C58",
            textDecoration: "none",
            display: "inline-block",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #474C58",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          View more info
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
          }}
        >
          <BookmarkButton event={event} />
        </Box>
      </Box>
    </Box>
  );
};
