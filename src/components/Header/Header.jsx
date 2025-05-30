import { NavLink, Link } from 'react-router';
import Container from '../../ui/Container/Container';
import s from './Header.module.css';
import Logo from '../../ui/Logo/Logo';
import { useMediaPoints } from '../../service/useMediaPoints';
import { IoMenu } from 'react-icons/io5';
import { useState } from 'react';
import ModalNav from '../ModalNav/ModalNav';
import MenuButton from '../../ui/MenuIcon/MenuIcon';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeFn = () => setIsOpen(false);
  const { isMobile } = useMediaPoints();
  return (
    <>
      {isOpen && <ModalNav closeFn={closeFn} isOpen={isOpen} />}
      <header className={s.header}>
        <Container className={s.container}>
          <Link to="/">
            <Logo />
          </Link>

          {isMobile ? (
            <MenuButton isOpen={isOpen} toggleFn={() => setIsOpen(prev => !prev)} />
          ) : (
            <nav className={s.navigation}>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? s.active : s.navLink)}
              >
                Home
              </NavLink>
              <NavLink
                to="/catalog"
                className={({ isActive }) => (isActive ? s.active : s.navLink)}
              >
                Catalog
              </NavLink>
            </nav>
          )}
        </Container>
      </header>
    </>
  );
}
