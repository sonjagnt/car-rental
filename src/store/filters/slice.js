import { createSlice } from '@reduxjs/toolkit';

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    brand: '',
    rentalPrice: null,
    mileageRange: [],
  },
  reducers: {
    changeBrandFilter(state, action) {
      state.brand = action.payload;
    },
    changePriceFilter(state, action) {
      state.rentalPrice = action.payload;
    },
    changeMileageFilter(state, action) {
      state.mileageRange = action.payload;
    },
  },
});

export const { changeBrandFilter, changePriceFilter, changeMileageFilter } =
  filtersSlice.actions;
export default filtersSlice.reducer;
