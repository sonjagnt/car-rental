import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCarDetails } from '../../store/cars/operations';
import { selectCarDetails, selectIsLoading } from '../../store/cars/selectors';
import s from './CarDetailsPage.module.css';
import { useForm } from 'react-hook-form';
import Container from '../../ui/Container/Container';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { SlLocationPin } from 'react-icons/sl';

export default function CarDetailsPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { id } = useParams();
  const isLoading = useSelector(selectIsLoading);
  const car = useSelector(selectCarDetails);

  useEffect(() => {
    dispatch(getCarDetails(id));
  }, [dispatch, id]);

  return (
    <Container className={s.container}>
      {isLoading && <p>Loading...</p>}

      {!isLoading && car && (
        <>
          <div className={s.imgForm}>
            <div className={s.imgWrapper}>
              <img src={car.img} />
            </div>
            <form>
              <input {...register('name', { required: true, maxLength: 20 })} />
              <input {...register('email', { required: true, maxLength: 20 })} />
              <input />
              <textarea {...register('comment', { maxLength: 300 })} />
              <button></button>
            </form>
          </div>

          <div className={s.info}>
            <div>
              <h2>
                {car.brand} {car.model}, {car.year}
              </h2>
              <p>
                <span>
                  <SlLocationPin />
                  {Array.from(car.address.split(' ')[3])}{' '}
                  {Array.from(car.address.split(' ')[4])}
                </span>
                <span>Mileage: {car.mileage} km</span>
              </p>
              <p>{car.rentalPrice} $</p>
              <p>{car.description}</p>
            </div>
            <ul>
              <h3>Rental Conditions:</h3>
              {car.rentalConditions.map(cond => (
                <li key={cond}>
                  <IoIosCheckmarkCircleOutline />
                  {cond}
                </li>
              ))}
            </ul>
            <ul>
              <h3>Car Specifications:</h3>
              <li>Year: {car.year}</li>
              <li>Type: {car.type}</li>
              <li>Fuel Consumption: {car.fuelConsumption}</li>
              <li>Car Engine Size: {car.engineSize}</li>
            </ul>
            <ul>
              <h3>Accessories and functionalities:</h3>
              {car.accessories.map(acc => (
                <li key={acc}>
                  <IoIosCheckmarkCircleOutline />
                  {acc}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </Container>
  );
}
