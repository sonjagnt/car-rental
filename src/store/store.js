import { configureStore } from '@reduxjs/toolkit';
import carsSlice from './cars/slice.js';
import filtersSlice from './filters/slice.js';

export const store = configureStore({
  reducer: {
    cars: carsSlice,
    filters: filtersSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
