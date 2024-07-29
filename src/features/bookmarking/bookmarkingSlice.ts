import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookmarkedEventsState {
  bookmarkedEvents: string[];
}

const initialState: BookmarkedEventsState = {
  bookmarkedEvents: [],
};

export const bookmarkingSlice = createSlice({
  name: "bookmarks",
  initialState: initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<string>) => {
      state.bookmarkedEvents.push(action.payload);
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      state.bookmarkedEvents = state.bookmarkedEvents.filter(
        (eventId) => eventId !== action.payload
      );
    },
  },
});

export const { addEvent, removeEvent } = bookmarkingSlice.actions;

export type { BookmarkedEventsState };
export default bookmarkingSlice.reducer;
