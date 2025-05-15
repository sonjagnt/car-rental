import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCars, getCarBrands, getCarById } from '../../service/car-api.js';

export const getCars = createAsyncThunk(
  'cars/getCars',
  async ({ page, brand, rentalPrice, minMileage, maxMileage }, thunkAPI) => {
    try {
      const data = await getAllCars({ page, brand, rentalPrice, minMileage, maxMileage });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

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

export const getBrands = createAsyncThunk('cars/getBrands', async (_, thunkAPI) => {
  try {
    const data = await getCarBrands();
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
