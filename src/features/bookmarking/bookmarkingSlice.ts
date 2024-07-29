import { createSlice } from "@reduxjs/toolkit";

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
    addEvent: (state, action) => {
      state.bookmarkedEvents.push(action.payload);
    },
    removeEvent: (state, action) => {
      const index = state.bookmarkedEvents.indexOf(action.payload);
      if (index > -1) {
        // only splice array when item is found
        state.bookmarkedEvents.splice(index, 1); // 2nd parameter means remove one item only
      }
    },
  },
});

export const { addEvent, removeEvent } = bookmarkingSlice.actions;

export type { BookmarkedEventsState };
export default bookmarkingSlice.reducer;
