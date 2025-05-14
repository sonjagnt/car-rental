import { NavLink, Link } from 'react-router';
import Container from '../../ui/Container/Container';
import s from './Header.module.css';
import Logo from '../../ui/Logo/Logo';

export default function Header() {
  return (
    <Container>
      <header className={s.header}>
        <Link to="/">
          <Logo />
        </Link>
        <nav className={s.navigation}>
          <NavLink to="/" className={s.navLink}>
            Home
          </NavLink>
          <NavLink to="/catalog" className={s.navLink}>
            Catalog
          </NavLink>
        </nav>
      </header>
    </Container>
  );
}
