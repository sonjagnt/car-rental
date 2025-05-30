import { NavLink } from 'react-router';
import s from './ModalNav.module.css';

export default function ModalNav({ closeFn }) {
  return (
    <>
      <nav className={s.navigation}>
        <NavLink to="/" className={s.navLink} onClick={closeFn}>
          Home
        </NavLink>
        <NavLink to="/catalog" className={s.navLink} onClick={closeFn}>
          Catalog
        </NavLink>
      </nav>
    </>
  );
}
