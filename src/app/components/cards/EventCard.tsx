import { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { AppDispatch, RootState } from "../../store";
import {
  addEvent,
  removeEvent,
} from "../../../features/bookmarking/bookmarkingSlice";
import { useSelector } from "react-redux";
import { Event } from "../../types";

type EventCardProps = {
  event: Event;
};

type BookmarkButtonProps = {
  event: Event;
  dispatch: AppDispatch;
};

const BookmarkButton = ({ event, dispatch }: BookmarkButtonProps) => {
  const bookmarks = useSelector(
    (state: RootState) => state.bookmarks.bookmarkedEvents
  );

  const [bookmarked, setBookmarked] = useState<boolean>(
    bookmarks.includes(event.id)
  );
  const handleClick = () => {
    setBookmarked((previousBookmarked) => {
      const newBookmarked = !previousBookmarked;
      if (newBookmarked) {
        dispatch(addEvent(event));
      } else {
        dispatch(removeEvent(event));
      }

      return newBookmarked;
    });
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
  const dispatch = useAppDispatch();
  return (
    <>
      <h1>{event.title}</h1>
      <p>{event.dateTime}</p>
      <p> {event.venue}</p>
      <p> {event.link}</p>
      <BookmarkButton event={event} dispatch={dispatch} />
    </>
  );
};
