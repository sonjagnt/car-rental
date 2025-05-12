import { useDispatch, useSelector } from 'react-redux';
import { selectCars } from '../../store/cars/selectors';
import { useEffect } from 'react';
import { getCars } from '../../store/cars/operations';

export default function CatalogList() {
  const cars = useSelector(selectCars);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  return (
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
  );
}
