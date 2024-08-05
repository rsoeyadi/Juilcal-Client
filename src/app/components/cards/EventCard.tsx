import { useAppDispatch } from "../../hooks/useAppDispatch";
import { RootState } from "../../store";
import {
  addEvent,
  removeEvent,
} from "../../../features/bookmarking/bookmarkingSlice";
import { useSelector } from "react-redux";
import { Event } from "../../types";
import { formatDate, getVenuePhoto } from "../../utils";
import { Box, IconButton, Snackbar, SnackbarCloseReason } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useState } from "react";

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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleClick = () => {
    if (bookmarked) {
      dispatch(removeEvent(event));
      setSnackbarMessage(`${event.title} removed from bookmarks`);
    } else {
      dispatch(addEvent(event));
      setSnackbarMessage(`${event.title} added to bookmarks`);
    }
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClick} aria-label="bookmark">
        {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        // @ts-ignore
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
    </>
  );
};

export const EventCard = ({ event }: EventCardProps) => {
  const venuePhoto = getVenuePhoto(event.venue);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "380px",
        margin: "0 auto",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "500px",
        marginBottom: 5,
      }}
    >
      <Box
        component="img"
        src={venuePhoto}
        alt={event.venue || "Default venue"}
        sx={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />
      <Box
        sx={{
          padding: "1em",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1,
        }}
      >
        <Box>
          <Box
            component="h1"
            sx={{
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "24px",
              lineHeight: "30px",
              marginBottom: "0.5em",
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
              marginBottom: "0.5em",
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
              marginBottom: "0.5em",
            }}
          >
            {event.venue}
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
          <BookmarkButton event={event} />
        </Box>
      </Box>
    </Box>
  );
};
