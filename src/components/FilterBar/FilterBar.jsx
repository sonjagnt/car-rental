import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import {
  selectBrand,
  selectMileageRange,
  selectRentalPrice,
} from '../../store/filters/selectors';
import { selectBrands, selectPage } from '../../store/cars/selectors';
import { Range } from 'react-range';
import { useEffect, useState } from 'react';
import { getBrands, getCars } from '../../store/cars/operations';
import axios from 'axios';

export default function FilterBar() {
  const brands = useSelector(selectBrands);

  const dispatch = useDispatch();

  const [mileage, setMileage] = useState([0, 10000]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  const brandOptions = brands.map(brand => ({
    value: brand,
    label: brand,
  }));

  const priceOptions = [
    { value: '30', label: '$30' },
    { value: '50', label: '$50' },
    { value: '80', label: '$80' },
  ];

  const handleMileageChange = values => {
    setMileage(values);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const params = {
      page: currentPage,
      brand: selectedBrand || undefined,
      rentalPrice: selectedPrice || undefined,
      minMileage: mileage[0],
      maxMileage: mileage[1],
    };

    try {
      const response = await axios.get('/cars', { params });
      console.log(response);

      dispatch(getCars(params));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select
        options={brandOptions}
        value={brandOptions.find(option => option.value === selectedBrand)}
        onChange={option => setSelectedBrand(option?.value || '')}
        placeholder="Choose a brand"
      />

      <Select
        options={priceOptions}
        value={priceOptions.find(option => option.value === selectedPrice)}
        onChange={option => setSelectedPrice(option?.value || '')}
        placeholder="Choose price"
      />

      <div>
        <Range
          step={1000}
          min={0}
          max={10000}
          values={mileage}
          onChange={handleMileageChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '6px',
                width: '100%',
                backgroundColor: '#ccc',
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              key={props.key}
              style={{
                ...props.style,
                height: '42px',
                width: '42px',
                backgroundColor: '#999',
              }}
            />
          )}
        />
        <div>
          <input
            type="number"
            value={mileage[0]}
            onChange={e => handleMileageChange([e.target.value || 0, mileage[1]])}
            placeholder="From"
          />
          <input
            type="number"
            value={mileage[1]}
            onChange={e => handleMileageChange([mileage[0], e.target.value || 0])}
            placeholder="To"
          />
        </div>
      </div>

      <button type="submit">Search</button>
    </form>
  );
}
