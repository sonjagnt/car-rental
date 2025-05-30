import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCarDetails } from '../../store/cars/operations';
import { selectCarDetails, selectIsLoading } from '../../store/cars/selectors';
import s from './CarDetailsPage.module.css';
import { Controller, useForm } from 'react-hook-form';
import Container from '../../ui/Container/Container';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { SlLocationPin } from 'react-icons/sl';
import { IoCalendarOutline } from 'react-icons/io5';
import { BsCarFront, BsFuelPump } from 'react-icons/bs';
import { PiGear } from 'react-icons/pi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from '../../ui/Loader/Loader';

export default function CarDetailsPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { id } = useParams();
  const isLoading = useSelector(selectIsLoading);
  const car = useSelector(selectCarDetails);

  useEffect(() => {
    dispatch(getCarDetails(id));
  }, [dispatch, id]);

  const onSubmit = async data => {
    if (data) {
      toast.success('Thank you for your request!');
    }
    console.log(data);
  };
  return (
    <Container className={s.container}>
      {isLoading && <Loader isLoading={isLoading} />}
      {!isLoading && car && (
        <>
          <div className={s.imgForm}>
            <div className={s.imgWrapper}>
              <img src={car.img} alt={car.description} />
            </div>
            <div className={s.formWrapper}>
              <h3 className={s.formTitle}>Book your car now</h3>
              <p className={s.subText}>
                Stay connected! We are always ready to help you.
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                <input
                  {...register('name', { required: true, maxLength: 20 })}
                  placeholder="Name*"
                  className={s.input}
                />
                {errors.name && <span className={s.error}>Name is required</span>}
                <input
                  {...register('email', {
                    required: true,
                    maxLength: 20,
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    },
                  })}
                  placeholder="Email*"
                />
                {errors.email && <span className={s.error}>Email is required</span>}
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <DatePicker
                        selectsRange
                        startDate={field.value?.[0]}
                        endDate={field.value?.[1]}
                        minDate={Date.now()}
                        wrapperClassName={s.datePickerWrapper}
                        className={s.datePicker}
                        placeholderText="Booking date"
                        calendarClassName="calendar"
                        onChange={dates => {
                          const [start, end] = dates;
                          field.onChange(end ? [start, end] : [start]);
                        }}
                        dateFormat="dd-MM-yyyy"
                      />
                    </div>
                  )}
                />
                <textarea
                  {...register('comment', { maxLength: 300 })}
                  placeholder="Comment"
                />
                <button type="submit" className={s.btn}>
                  Send
                </button>
              </form>
            </div>
          </div>

          <div className={s.info}>
            <div>
              <h2 className={s.carName}>
                {car.brand} {car.model}, {car.year}
              </h2>
              <p className={s.smallText}>
                <span className={s.location}>
                  <SlLocationPin size={16} />
                  {Array.from(car.address.split(' ')[3])}{' '}
                  {Array.from(car.address.split(' ')[4])}
                </span>
                <span>Mileage: {car.mileage.toLocaleString('ru-RU')} km</span>
              </p>
              <p className={s.price}>{car.rentalPrice} $</p>
              <p className={s.descr}>{car.description}</p>
            </div>
            <div className={s.lists}>
              <ul className={s.list}>
                <h3 className={s.listTitle}>Rental Conditions:</h3>
                {car.rentalConditions.map(cond => (
                  <li key={cond} className={s.listItem}>
                    <IoIosCheckmarkCircleOutline size={16} />
                    {cond}
                  </li>
                ))}
              </ul>
              <ul className={s.list}>
                <h3 className={s.listTitle}>Car Specifications:</h3>
                <li className={s.listItem}>
                  <IoCalendarOutline size={16} />
                  Year: {car.year}
                </li>
                <li className={s.listItem}>
                  <BsCarFront size={16} />
                  Type: {car.type}
                </li>
                <li className={s.listItem}>
                  <BsFuelPump size={16} />
                  Fuel Consumption: {car.fuelConsumption}
                </li>
                <li className={s.listItem}>
                  <PiGear size={16} />
                  Car Engine Size: {car.engineSize}
                </li>
              </ul>
              <ul className={s.list}>
                <h3 className={s.listTitle}>Accessories and functionalities:</h3>
                {car.accessories.map(acc => (
                  <li key={acc} className={s.listItem}>
                    <IoIosCheckmarkCircleOutline />
                    {acc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
      <Toaster />
    </Container>
  );
}
