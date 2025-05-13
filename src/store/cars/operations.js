import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCars, getCarById } from '../../service/car-api.js';

export const getCars = createAsyncThunk('cars/getCars', async (page, thunkAPI) => {
  try {
    const data = await getAllCars(page);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const getCarDetails = createAsyncThunk(
  'cars/getCarDetails',
  async (id, thunkAPI) => {
    try {
      const data = await getCarById(id);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
