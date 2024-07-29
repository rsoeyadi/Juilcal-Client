import { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { AppDispatch } from "../../store";

type EventCardProps = {
  title: string;
  date: string;
  venue: string;
  link: string;
};

type BookmarkButtonProps = {
  dispatch: AppDispatch;
};

const BookmarkButton = ({ dispatch }: BookmarkButtonProps) => {
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const handleClick = () => {
    setBookmarked(!bookmarked);
  };
  return <button></button>;
};
export const EventCard = ({ title, date, venue, link }: EventCardProps) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <h1>{title}</h1>
      <p>{date}</p>
      <p> {venue}</p>
      <p> {link}</p>
      <BookmarkButton dispatch={dispatch} />
    </>
  );
};
