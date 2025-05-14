import { createSelector } from '@reduxjs/toolkit';
import { selectBrand, selectMileageRange, selectRentalPrice } from '../filters/selectors';

export const selectCars = state => state.cars.items;
export const selectPage = state => state.cars.page;
export const selectIsLoading = state => state.cars.isLoading;
export const selectTotalPages = state => state.cars.totalPages;

export const selectFilteredCars = createSelector(
  [selectCars, selectBrand, selectRentalPrice, selectMileageRange],
  (cars, brand, rentalPrice, mileageRange) => {
    const [minMileage, maxMileage] = mileageRange;
    return cars.filter(car => {
      return (
        (!brand || car.brand.toLowerCase() === brand.toLowerCase()) &&
        (!rentalPrice || car.rentalPrice === rentalPrice) &&
        car.mileage >= minMileage &&
        car.mileage <= maxMileage
      );
    });
  }
);
