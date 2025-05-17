import { createSlice } from '@reduxjs/toolkit';
import { getBrands, getCarDetails, getCars } from './operations';
import toast from 'react-hot-toast';

const initialState = {
  items: [],
  brands: [],
  page: 1,
  totalPages: 0,
  carDetails: null,
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  toast.error('Something went wrong. Please, try again!');
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    resetCars(state) {
      state.items = [];
      state.page = 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCars.pending, handlePending)
      .addCase(getCars.fulfilled, (state, action) => {
        const { cars, totalPages, page } = action.payload;

        if (page === 1) {
          state.items = cars;
        } else {
          state.items = [...state.items, ...cars];
        }
        state.totalPages = totalPages;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getCars.rejected, handleRejected)
      .addCase(getCarDetails.pending, handlePending)
      .addCase(getCarDetails.fulfilled, (state, action) => {
        state.carDetails = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getCarDetails.rejected, handleRejected)
      .addCase(getBrands.pending, handlePending)
      .addCase(getBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getBrands.rejected, handleRejected);
  },
});

export const { setPage, resetCars } = carsSlice.actions;
export default carsSlice.reducer;
