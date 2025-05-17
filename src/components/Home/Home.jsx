import { useNavigate } from 'react-router-dom';
import s from './Home.module.css';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Find your perfect rental car</h1>
      <p className={s.subtitle}>Reliable and budget-friendly rentals for any journey</p>
      <button className={s.btn} onClick={() => navigate('/catalog')}>
        View Catalog
      </button>
    </div>
  );
}
