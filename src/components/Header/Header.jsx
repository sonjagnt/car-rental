import { NavLink, Link } from 'react-router';

export default function Header() {
  return (
    <header>
      <Link to="/">
        Rental<span>Car</span>
      </Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/catalog">Catalog</NavLink>
      </nav>
    </header>
  );
}
