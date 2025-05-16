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
import { Link } from 'react-router-dom';
import FilterBar from '../FilterBar/FilterBar';
import s from './CatalogList.module.css';
import {
  selectBrand,
  selectMinMileage,
  selectMaxMileage,
  selectRentalPrice,
} from '../../store/filters/selectors';

export default function CatalogList() {
  const allCars = useSelector(selectCars);
  const currentPage = useSelector(selectPage);
  const brand = useSelector(selectBrand);
  const rentalPrice = useSelector(selectRentalPrice);
  const minMileage = useSelector(selectMinMileage);
  const maxMileage = useSelector(selectMaxMileage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCars({ page: 1 }));
  }, [dispatch]);

  const handleNext = () => {
    const nextPage = currentPage + 1;

    dispatch(setPage(nextPage));
    dispatch(
      getCars({
        page: nextPage,
        brand: brand || undefined,
        rentalPrice: rentalPrice || undefined,
        minMileage: minMileage ?? undefined,
        maxMileage: maxMileage ?? undefined,
      })
    );
  };

  return (
    <div>
      <FilterBar />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className={s.list}>
            {allCars.map(car => (
              <li key={car.id} className={s.listItem}>
                <div className={s.imgWrapper}>
                  <img src={car.img} />
                </div>
                <div className={s.mainInfo}>
                  <p className={s.carName}>
                    {car.brand} <span className={s.accent}>{car.model}</span>, {car.year}
                  </p>
                  <p>$ {car.rentalPrice}</p>
                </div>
                <div>
                  <p className={s.additionalInfo}>
                    {Array.from(car.address.split(' ')[3])} | {car.rentalCompany} |<br />
                    {car.type} | {car.mileage} km
                  </p>
                </div>
                <Link to={`${car.id}`} className={s.btn}>
                  Read more
                </Link>
              </li>
            ))}
          </ul>
          {allCars.length > 0 && currentPage < totalPages && totalPages > 1 && (
            <div className={s.btnWrapper}>
              <button onClick={handleNext} className={s.moreBtn}>
                Load More
              </button>
            </div>
          )}
        </>
      )}
      {allCars.length === 0 && <div>No cars found. Please, try something else.</div>}
    </div>
  );
}
