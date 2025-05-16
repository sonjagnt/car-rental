import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  brand: '',
  rentalPrice: '',
  minMileage: null,
  maxMileage: null,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: initialState,
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
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  changeBrandFilter,
  changePriceFilter,
  changeMinMileageFilter,
  changeMaxMileageFilter,
  resetFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
