import { NavLink, Link } from 'react-router';
import Container from '../../ui/Container/Container';
import s from './Header.module.css';
import Logo from '../../ui/Logo/Logo';

export default function Header() {
  return (
    <header className={s.header}>
      <Container className={s.container}>
        <Link to="/">
          <Logo />
        </Link>
        <nav className={s.navigation}>
          <NavLink to="/" className={({ isActive }) => (isActive ? s.active : s.navLink)}>
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) => (isActive ? s.active : s.navLink)}
          >
            Catalog
          </NavLink>
        </nav>
      </Container>
    </header>
  );
}
