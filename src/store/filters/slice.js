import { createSlice } from '@reduxjs/toolkit';

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    brand: '',
    rentalPrice: '',
    minMileage: null,
    maxMileage: null,
  },
  reducers: {
    changeBrandFilter(state, action) {
      state.brand = action.payload;
    },
    changePriceFilter(state, action) {
      state.rentalPrice = action.payload;
    },
    changeMinMileageFilter(state, action) {
      state.minMileage = action.payload;
    },
    changeMaxMileageFilter(state, action) {
      state.maxMileage = action.payload;
    },
  },
});

export const {
  changeBrandFilter,
  changePriceFilter,
  changeMinMileageFilter,
  changeMaxMileageFilter,
} = filtersSlice.actions;
export default filtersSlice.reducer;
