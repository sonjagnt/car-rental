import { createSlice } from '@reduxjs/toolkit';

const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: savedFavorites,
  },
  reducers: {
    addFavorite: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
    deleteFavorite: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload.id);
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
  },
});

export const { addFavorite, deleteFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
