import { createSlice } from '@reduxjs/toolkit';
import { getCarDetails, getCars } from './operations';

const initialState = {
  items: [],
  page: 1,
  totalPages: 0,
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCars.pending, handlePending)
      .addCase(getCars.fulfilled, (state, action) => {
        state.items = action.payload.cars;
        state.totalPages = action.payload.totalPages;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getCars.rejected, handleRejected)
      .addCase(getCarDetails.pending, handlePending)
      .addCase(getCarDetails.fulfilled, (state, action) => {
        state.items.find(i => {
          i.id === action.payload.id;
        });
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getCarDetails.rejected, handleRejected);
  },
});

export const { setPage } = carsSlice.actions;
export default carsSlice.reducer;
