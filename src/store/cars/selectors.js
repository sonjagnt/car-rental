// import { createSelector } from '@reduxjs/toolkit';
// import { selectBrand, selectRentalPrice, selectMileageRange } from '../filters/selectors';

export const selectCars = state => state.cars.items;
export const selectPage = state => state.cars.page;
export const selectBrands = state => state.cars.brands;
export const selectIsLoading = state => state.cars.isLoading;
export const selectTotalPages = state => state.cars.totalPages;
export const selectCarDetails = state => state.cars.carDetails;

// export const selectFilteredCars = createSelector(
//   [selectCars, selectBrand, selectRentalPrice, selectMileageRange],
//   (cars, brand, rentalPrice, mileageRange) => {
//     const { from, to } = mileageRange;
//     return cars.filter(car => {
//       return (
//         (!brand || car.brand.toLowerCase() === brand.toLowerCase()) &&
//         (!rentalPrice || car.rentalPrice === rentalPrice) &&
//         (from === null || car.mileage >= from) &&
//         (to === null || car.mileage <= to)
//       );
//     });
//   }
// );
