import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCars } from '../../service/car-api.js';

export const getCars = createAsyncThunk('cars/getCars', async (page, thunkAPI) => {
  try {
    const data = await getAllCars(page);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
