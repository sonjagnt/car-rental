import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import {
  changeBrandFilter,
  changeMaxMileageFilter,
  changeMinMileageFilter,
  changePriceFilter,
} from '../../store/filters/slice';
import { selectBrands } from '../../store/cars/selectors';
import {
  selectBrand,
  selectMaxMileage,
  selectMinMileage,
  selectRentalPrice,
} from '../../store/filters/selectors';
import { getCars } from '../../store/cars/operations';
import { useEffect, useMemo, useState } from 'react';
import { getBrands } from '../../store/cars/operations';
import s from './FilterBar.module.css';
import { customStyles } from '../../constants/customStyles';
import Container from '../../ui/Container/Container';

export default function FilterBar() {
  const dispatch = useDispatch();

  const brand = useSelector(selectBrand);
  const rentalPrice = useSelector(selectRentalPrice);
  const minMileage = useSelector(selectMinMileage);
  const maxMileage = useSelector(selectMaxMileage);
  const brands = useSelector(selectBrands);

  const [mileage, setMileage] = useState([minMileage || 0, maxMileage || 10000]);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const brandOptions = useMemo(
    () => brands.map(brand => ({ value: brand, label: brand })),
    [brands]
  );

  const priceOptions = [
    { value: '30', label: '$30' },
    { value: '40', label: '$40' },
    { value: '50', label: '$50' },
    { value: '60', label: '$60' },
    { value: '70', label: '$80' },
    { value: '80', label: '$80' },
  ];

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(changeBrandFilter(brand));
    dispatch(changePriceFilter(rentalPrice));
    dispatch(changeMinMileageFilter(mileage[0]));
    dispatch(changeMaxMileageFilter(mileage[1]));

    dispatch(
      getCars({
        page: 1,
        brand: brand || undefined,
        rentalPrice: rentalPrice || undefined,
        minMileage: mileage[0],
        maxMileage: mileage[1],
      })
    );
  };

  return (
    <Container className={s.wrapper}>
      <form onSubmit={handleSubmit} className={s.form}>
        <label className={s.label}>
          Car brand
          <Select
            styles={customStyles}
            options={brandOptions}
            value={brandOptions.find(option => option.value === brand)}
            onChange={option => dispatch(changeBrandFilter(option?.value || ''))}
            placeholder="Choose a brand"
          />
        </label>
        <label className={s.label}>
          Price/ 1 hour
          <Select
            styles={customStyles}
            options={priceOptions}
            value={priceOptions.find(option => option.value === rentalPrice)}
            onChange={option => dispatch(changePriceFilter(option?.value || ''))}
            placeholder="Choose a price"
          />
        </label>
        <div>
          <label className={s.label}>Car mileage | km</label>
          <input
            type="number"
            value={mileage[0]}
            onChange={e => setMileage([+e.target.value, mileage[1]])}
            placeholder="Min"
          />
          <input
            type="number"
            value={mileage[1]}
            onChange={e => setMileage([mileage[0], +e.target.value])}
            placeholder="Max"
          />
        </div>
        <button type="submit" className={s.btn}>
          Search
        </button>
      </form>
    </Container>
  );
}
