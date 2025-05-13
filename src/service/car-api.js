import axios from 'axios';

axios.defaults.baseURL = 'https://car-rental-api.goit.global/';

export const getAllCars = async page => {
  try {
    const response = await axios.get('/cars', {
      params: {
        page: page,
        per_page: 10,
        limit: 10,
      },
    });
    console.log(response.data);

    return response.data;
  } catch (e) {
    console.log(e.message);
    throw e;
  }
};
