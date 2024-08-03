import { useAppDispatch } from "../../hooks/useAppDispatch";
import { RootState } from "../../store";
import {
  addEvent,
  removeEvent,
} from "../../../features/bookmarking/bookmarkingSlice";
import { useSelector } from "react-redux";
import { Event } from "../../types";
import { formatDate } from "../../utils";

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
    <button
      onClick={handleClick}
      aria-pressed={bookmarked}
      aria-label="Bookmark"
    >
      <img
        src={bookmarked ? "/bookmark-filled.svg" : "/bookmark.svg"}
        alt="Icon"
      />
    </button>
  );
};

export const EventCard = ({ event }: EventCardProps) => {
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
