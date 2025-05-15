import { createSlice } from '@reduxjs/toolkit';

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    brand: '',
    rentalPrice: null,
    mileageRange: { from: null, to: null },
  },
  reducers: {
    changeBrandFilter(state, action) {
      state.brand = action.payload;
    },
    changePriceFilter(state, action) {
      state.rentalPrice = action.payload;
    },
    changeMileageFilter(state, action) {
      const { from, to } = action.payload;

      state.mileageRange = {
        from: from ?? null,
        to: to ?? null,
      };
    },
  },
});

export const { changeBrandFilter, changePriceFilter, changeMileageFilter } =
  filtersSlice.actions;
export default filtersSlice.reducer;
