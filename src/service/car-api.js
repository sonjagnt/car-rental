import axios from 'axios';

axios.defaults.baseURL = 'https://car-rental-api.goit.global/';

export const getAllCars = async () => {
  try {
    const response = await axios.get('/cars');
    return response.data.cars;
  } catch (e) {
    console.log(e.message);
    throw e;
  }
};
