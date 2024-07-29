type EventCardProps = {
  title: string;
  date: string;
  venue: string;
  link: string;
};


const BookmarkButton = () => {
    const handleClick = () => {
        
    }
  return <button></button>;
};
export const EventCard = ({ title, date, venue, link }: EventCardProps) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{date}</p>
      <p> {venue}</p>
      <p> {link}</p>
      <BookmarkButton />
    </>
  );
};
