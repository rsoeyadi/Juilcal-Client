import { createSlice } from "@reduxjs/toolkit";

export const componentDisplaying = createSlice({
  name: "componentDisplaying",
  initialState: {
    isFilterMenuOpen: false,
    isBookmarkedEventsMenuOpen: false,
    isOnDesktop: false,
  },
  reducers: {
    setIsFilterMenuOpen: (state, action) => {
      state.isFilterMenuOpen = action.payload;
    },
    setIsBookmarkedEventsMenuOpen: (state, action) => {
      state.isBookmarkedEventsMenuOpen = action.payload;
    },
    setIsOnDesktop: (state, action) => {
      state.isOnDesktop = action.payload;
    },
  },
});

export const {
  setIsFilterMenuOpen,
  setIsBookmarkedEventsMenuOpen,
  setIsOnDesktop,
} = componentDisplaying.actions;

export default componentDisplaying.reducer;
