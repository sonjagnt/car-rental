import { useDispatch, useSelector } from 'react-redux';
import Select, { components as RSComponents } from 'react-select';

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
import { customStyles, theme } from '../../constants/customStyles';
import Container from '../../ui/Container/Container';
import { resetCars } from '../../store/cars/slice';

export default function FilterBar() {
  const dispatch = useDispatch();

  const brand = useSelector(selectBrand);
  const rentalPrice = useSelector(selectRentalPrice);
  const minMileage = useSelector(selectMinMileage);
  const maxMileage = useSelector(selectMaxMileage);
  const brands = useSelector(selectBrands);

  const [mileage, setMileage] = useState([minMileage ?? '', maxMileage ?? '']);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const brandOptions = useMemo(
    () => [
      { value: '', label: 'Choose a brand' },
      ...brands.map(brand => ({ value: brand, label: brand })),
    ],
    [brands]
  );

  const priceOptions = [
    { value: '', label: 'Choose a price' },
    { value: '30', label: '30' },
    { value: '40', label: '40' },
    { value: '50', label: '50' },
    { value: '60', label: '60' },
    { value: '70', label: '70' },
    { value: '80', label: '80' },
  ];

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(changeBrandFilter(brand));
    dispatch(changePriceFilter(rentalPrice));
    dispatch(changeMinMileageFilter(mileage[0]));
    dispatch(changeMaxMileageFilter(mileage[1]));

    dispatch(resetCars());

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

  const CustomSingleValue = props => {
    const value = props.data.value;
    if (value === '') {
      return <RSComponents.Placeholder {...props} />;
    }
    return <RSComponents.SingleValue {...props}>To {value}$</RSComponents.SingleValue>;
  };

  return (
    <Container className={s.wrapper}>
      <form onSubmit={handleSubmit} className={s.form}>
        <label className={s.label}>
          <span className={s.labelText}>Car brand</span>
          <Select
            classNamePrefix="custom-select"
            theme={theme}
            styles={customStyles}
            options={brandOptions}
            value={brandOptions.find(option => option.value === brand)}
            onChange={option => dispatch(changeBrandFilter(option?.value || ''))}
            placeholder="Choose a brand"
          />
        </label>
        <label className={s.label}>
          <span className={s.labelText}>Price/ 1 hour</span>
          <Select
            classNamePrefix="custom-select"
            theme={theme}
            styles={customStyles}
            options={priceOptions}
            value={priceOptions.find(option => option.value === rentalPrice)}
            onChange={option => dispatch(changePriceFilter(option?.value || ''))}
            placeholder="Choose a price"
            components={{ SingleValue: CustomSingleValue }}
          />
        </label>
        <div>
          <label className={s.label}>
            <span className={s.labelText}>Car mileage | km</span>
            <div className={s.mileageInputs}>
              <span className={s.textBox}>
                From
                <input
                  className={s.mileageInput}
                  type="text"
                  inputMode="numeric"
                  value={mileage[0].toLocaleString('en-US')}
                  onChange={e => {
                    const raw = e.target.value.replace(/,/g, '');
                    const parsed = Number(raw);
                    setMileage([parsed, mileage[1]]);
                  }}
                />
              </span>
              <span className={s.textBox}>
                To
                <input
                  className={s.mileageInput}
                  type="text"
                  inputMode="numeric"
                  value={mileage[1].toLocaleString('en-US')}
                  onChange={e => {
                    const raw = e.target.value.replace(/,/g, '');
                    const parsed = Number(raw);
                    setMileage([mileage[0], parsed]);
                  }}
                />
              </span>
            </div>
          </label>
        </div>
        <button type="submit" className={s.btn}>
          Search
        </button>
      </form>
    </Container>
  );
}
