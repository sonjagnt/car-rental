import axios from 'axios';

axios.defaults.baseURL = 'https://car-rental-api.goit.global/';

export const getAllCars = async ({
  page,
  brand,
  rentalPrice,
  minMileage,
  maxMileage,
}) => {
  const params = {
    page: page,
    per_page: 10,
    limit: 12,
  };

  if (brand) params.brand = brand;
  if (rentalPrice) params.rentalPrice = rentalPrice;
  if (minMileage != null) params.minMileage = minMileage;
  if (maxMileage != null) params.maxMileage = maxMileage;

  try {
    const response = await axios.get('/cars', { params });
    console.log(response);

    return response.data;
  } catch (e) {
    throw e.message;
  }
};

export const getCarById = async id => {
  try {
    const response = await axios.get(`/cars/${id}`);
    console.log(response);
    return response;
  } catch (e) {
    throw e.message;
  }
};

export const getCarBrands = async () => {
  try {
    const response = await axios.get('/brands');
    console.log(response);
    return response;
  } catch (e) {
    throw e.message;
  }
};
