import { BarLoader } from 'react-spinners';
import s from './Loader.module.css';

export const Loader = ({ isLoading }) => {
  return (
    <div className={s.loader}>
      <BarLoader color="#3470FF" loading={isLoading} />
    </div>
  );
};
