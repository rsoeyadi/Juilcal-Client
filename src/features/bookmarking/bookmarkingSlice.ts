import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event as EventType } from "../../app/types";

interface BookmarkedEventsState {
  bookmarkedEvents: string[]; // so this is an array of ids and it'll be in order since it's an array, which is good
  actualEventsInformation: { // then we can just index into this... which will actually have all the information we need. And we also don't need to query the db again :D
    [id: string]: EventType;
  };
}

const initialState: BookmarkedEventsState = {
  bookmarkedEvents: [],
  actualEventsInformation: {},
};

export const bookmarkingSlice = createSlice({
  name: "bookmarks",
  initialState: initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<EventType>) => {
      const event = action.payload;
      state.bookmarkedEvents.push(event.id);
      state.actualEventsInformation[event.id] = event;
    },
    removeEvent: (state, action: PayloadAction<EventType>) => {
      const event = action.payload;
      state.bookmarkedEvents = state.bookmarkedEvents.filter(
        (eventId) => eventId !== event.id
      );
      delete state.actualEventsInformation[event.id];
    },
    setEventInformation: (state, action: PayloadAction<EventType>) => {
      const event = action.payload;
      state.actualEventsInformation[event.id] = event;
    },
  },
});

export const { addEvent, removeEvent } = bookmarkingSlice.actions;

export type { BookmarkedEventsState };
export default bookmarkingSlice.reducer;
