import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilteredCars,
  selectIsLoading,
  selectPage,
  selectTotalPages,
} from '../../store/cars/selectors';
import { useEffect } from 'react';
import { getCars } from '../../store/cars/operations';
import { setPage } from '../../store/cars/slice';
import { Link } from 'react-router';
import FilterBar from '../FilterBar/FilterBar';

export default function CatalogList() {
  const filteredCars = useSelector(selectFilteredCars);
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
      {/* <FilterBar /> */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul>
            {filteredCars.map(car => (
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
                  <Link to={`${car.id}`}>Read more</Link>
                </div>
              </li>
            ))}
          </ul>
          {filteredCars.length > 0 && currentPage < totalPages && totalPages > 1 && (
            <button onClick={handleNext}>Load More</button>
          )}
        </>
      )}
      {filteredCars.length === 0 && <div>No cars found. Please, try something else.</div>}
    </div>
  );
}
