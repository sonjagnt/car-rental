import { useDispatch, useSelector } from 'react-redux';
import {
  selectCars,
  selectIsLoading,
  selectPage,
  selectTotalPages,
} from '../../store/cars/selectors';
import { useEffect } from 'react';
import { getCars } from '../../store/cars/operations';
import { resetCars, setPage } from '../../store/cars/slice';
import { Link } from 'react-router-dom';
import FilterBar from '../FilterBar/FilterBar';
import s from './CatalogList.module.css';
import {
  selectBrand,
  selectMinMileage,
  selectMaxMileage,
  selectRentalPrice,
} from '../../store/filters/selectors';

import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { selectFavorites } from '../../store/favorites/selectors';
import { addFavorite, deleteFavorite } from '../../store/favorites/slice';
import { Loader } from '../../ui/Loader/Loader';

export default function CatalogList() {
  const allCars = useSelector(selectCars);
  const currentPage = useSelector(selectPage);
  const brand = useSelector(selectBrand);
  const rentalPrice = useSelector(selectRentalPrice);
  const minMileage = useSelector(selectMinMileage);
  const maxMileage = useSelector(selectMaxMileage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);

  const favorites = useSelector(selectFavorites);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCars());
    dispatch(getCars({ page: 1 }));
  }, [dispatch]);

  const toggleFavorite = car => {
    if (favorites.find(fav => fav.id === car.id)) {
      dispatch(deleteFavorite(car));
    } else {
      dispatch(addFavorite(car));
    }
  };

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
    <section>
      <FilterBar />
      {isLoading && <Loader isLoading={isLoading} />}
      <>
        <ul className={s.list}>
          {allCars.map(car => (
            <li key={car.id} className={s.listItem}>
              <button onClick={() => toggleFavorite(car)}>
                {favorites.find(fav => fav.id === car.id) ? (
                  <IoIosHeart className={s.favIcon} size={16} fill="#3470FF" />
                ) : (
                  <IoIosHeartEmpty className={s.favIcon} size={16} fill="#fff" />
                )}
              </button>
              <div className={s.imgWrapper}>
                <img src={car.img} alt={car.description} />
              </div>
              <div className={s.mainInfo}>
                <h4 className={s.carName}>
                  {car.brand} <span className={s.accent}>{car.model}</span>, {car.year}
                </h4>
                <p>$ {car.rentalPrice}</p>
              </div>
              <div>
                <div className={s.additionalInfo}>
                  <span>{car.address.split(',')[1]}</span>
                  <span>{car.address.split(',')[2]}</span>
                  <span>{car.rentalCompany}</span>
                  <br />
                  <span>{car.type}</span>
                  <span>{car.mileage.toLocaleString('ru-RU')} km</span>
                </div>
              </div>
              <Link to={`${car.id}`} className={s.btn}>
                Read more
              </Link>
            </li>
          ))}
        </ul>
        {allCars.length > 0 && totalPages > 1 && (
          <div className={s.btnWrapper}>
            {currentPage < totalPages && (
              <button onClick={handleNext} className={s.navBtn}>
                Load More
              </button>
            )}
          </div>
        )}
      </>

      {allCars.length === 0 && <div>No cars found. Please, try something else.</div>}
    </section>
  );
}
