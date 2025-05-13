import { createSlice } from '@reduxjs/toolkit';

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    brand: '',
    rentalPrice: '',
    mileageRange: [0, 100000],
  },
  reducers: {
    changeBrandFilter(state, action) {
      state.brand = action.payload;
    },
    changePriceFilter(state, action) {
      state.rentalPrice = action.payload;
    },
    changeMileageFilter(state, action) {
      state.mileage = action.payload;
    },
  },
});

export const { changeBrandFilter, changePriceFilter, changeMileageFilter } =
  filtersSlice.actions;
export default filtersSlice.reducer;
