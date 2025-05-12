import { configureStore } from '@reduxjs/toolkit';
import carsSlice from './cars/slice.js';

export const store = configureStore({
  reducer: {
    cars: carsSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
