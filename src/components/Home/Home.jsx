import { useNavigate } from 'react-router-dom';
import s from './Home.module.css';

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <h1 className={s.title}>Find your perfect rental car</h1>
      <h3>Reliable and budget-friendly rentals for any journey</h3>
      <button onClick={() => navigate('/catalog')}>View Catalog</button>
    </>
  );
}
