import { configureStore } from '@reduxjs/toolkit';
import carsSlice from './cars/slice.js';
import filtersSlice from './filters/slice.js';
import favoritesSlice from './favorites/slice.js';

export const store = configureStore({
  reducer: {
    cars: carsSlice,
    filters: filtersSlice,
    favorites: favoritesSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
