import { useParams } from 'react-router';
import { getCarById } from '../../service/car-api';

export default function CarDetailsPage() {
  const { id } = useParams();
  const carDetails = getCarById(id);
  console.log(carDetails);

  return (
    <>
      <p>CarDetailsPage</p>
    </>
  );
}
