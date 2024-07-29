import { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { AppDispatch } from "../../store";
import {
  addEvent,
  removeEvent,
} from "../../../features/bookmarking/bookmarkingSlice";

type EventCardProps = {
  id: string;
  title: string;
  date: string;
  venue: string;
  link: string;
};

type BookmarkButtonProps = {
  eventId: string;
  dispatch: AppDispatch;
};

const BookmarkButton = ({ eventId, dispatch }: BookmarkButtonProps) => {
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const handleClick = () => {
    setBookmarked((previousBookmarked) => {
      const newBookmarked = !previousBookmarked;
      if (newBookmarked) {
        dispatch(addEvent(eventId));
      } else {
        dispatch(removeEvent(eventId));
      }

      console.log({ newBookmarked });

      return newBookmarked;
    });
  };
  return (
    <button
      onClick={handleClick}
      aria-pressed={bookmarked}
      aria-label="Bookmark"
    >
      {bookmarked}
    </button>
  );
};
export const EventCard = ({ id, title, date, venue, link }: EventCardProps) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <h1>{title}</h1>
      <p>{date}</p>
      <p> {venue}</p>
      <p> {link}</p>
      <BookmarkButton eventId={id} dispatch={dispatch} />
    </>
  );
};
