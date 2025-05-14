import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import {
  changeBrandFilter,
  changeMileageFilter,
  changePriceFilter,
} from '../../store/filters/slice';
import {
  selectBrand,
  selectMileageRange,
  selectRentalPrice,
} from '../../store/filters/selectors';
import { selectCars } from '../../store/cars/selectors';
import { Range } from 'react-range';
import { useEffect, useState } from 'react';

export default function FilterBar() {
  const allCars = useSelector(selectCars);
  const brand = useSelector(selectBrand);
  const price = useSelector(selectRentalPrice);

  const dispatch = useDispatch();

  useEffect(() => {
    const mileages = allCars.map(car => car.mileage);
    const minMileage = Math.min(...mileages);
    const maxMileage = Math.max(...mileages);
    dispatch(changeMileageFilter([minMileage, maxMileage]));
  }, [allCars, dispatch]);

  const mileageRange = useSelector(selectMileageRange);
  useEffect(() => {
    setMileage(mileageRange);
  }, [mileageRange]);

  console.log(mileageRange);

  const [mileage, setMileage] = useState(mileageRange);

  const brandOptions = Array.from(new Set(allCars.map(car => car.brand))).map(brand => ({
    value: brand,
    label: brand,
  }));

  const priceOptions = Array.from(new Set(allCars.map(car => car.rentalPrice))).map(
    price => ({
      value: price,
      label: price,
    })
  );

  const handleMileageChange = values => {
    setMileage(values);
    dispatch(changeMileageFilter(values));
  };

  const handleChange = filterType => selectedOption => {
    dispatch(filterType(selectedOption ? selectedOption.value : ''));
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(changeBrandFilter(brand));
    dispatch(changePriceFilter(price));
    dispatch(changeMileageFilter(mileage));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select
        options={brandOptions}
        value={brandOptions.find(option => option.value === brand)}
        onChange={handleChange(changeBrandFilter)}
        placeholder="Choose a brand"
      />
      <Select
        options={priceOptions}
        value={priceOptions.find(option => option.value === price)}
        onChange={handleChange(changePriceFilter)}
      />
      <div>
        <Range
          step={1}
          min={mileageRange[0]}
          max={mileageRange[1]}
          values={mileage}
          onChange={handleMileageChange}
          renderTrack={({ props, children }) => (
            <div {...props} className="track">
              {children}
            </div>
          )}
          renderThumb={({ props }) => <div {...props} className="thumb" />}
        />
        <div>
          <input
            type="number"
            value={mileage[0]}
            min={mileageRange[0]}
            max={mileageRange[1]}
            onChange={e => handleMileageChange([parseInt(e.target.value), mileage[1]])}
            placeholder="From"
          />
          <input
            type="number"
            value={mileage[1]}
            min={mileageRange[0]}
            max={mileageRange[1]}
            onChange={e => handleMileageChange([mileage[0], parseInt(e.target.value)])}
            placeholder="To"
          />
        </div>
      </div>
      <button type="submit">Search</button>
    </form>
  );
}
