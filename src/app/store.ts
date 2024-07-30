import { combineReducers, configureStore } from "@reduxjs/toolkit";
import searchbarReducer from "../features/search/searchbarSlice";
import filtersReducer from "../features/filters/filtersSlice";
import bookmarkReducer from "../features/bookmarking/bookmarkingSlice";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const allReducers = combineReducers({
  searchbarValue: searchbarReducer,
  filters: filtersReducer,
  bookmarks: bookmarkReducer,
});

const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch; // This infers the type of the Redux store's dispatch function, which makes sure that the dispatched actions are correctly typed
export type RootState = ReturnType<typeof store.getState>; // same deal here, but with my state
export const persistor = persistStore(store);
