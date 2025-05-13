import { useDispatch, useSelector } from 'react-redux';
import {
  selectCars,
  selectIsLoading,
  selectPage,
  selectTotalPages,
} from '../../store/cars/selectors';
import { useEffect } from 'react';
import { getCars } from '../../store/cars/operations';
import { setPage } from '../../store/cars/slice';

export default function CatalogList() {
  const cars = useSelector(selectCars);
  const currentPage = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCars(currentPage));
  }, [dispatch, currentPage]);

  const handleNext = () => {
    dispatch(setPage(currentPage + 1));
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul>
            {cars.map(car => (
              <li key={car.id}>
                <div>
                  <img src={car.img} />
                  <div>
                    {car.brand}
                    {car.model}
                    {car.year}
                    {car.rentalPrice}
                  </div>
                  <div>
                    {car.address}
                    {car.rentalCompany}
                    {car.type}
                    {car.mileage}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {currentPage < totalPages && totalPages > 1 && (
            <button onClick={handleNext}>Load More</button>
          )}
        </>
      )}
    </div>
  );
}
