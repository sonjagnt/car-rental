import { Link } from 'react-router';
import Container from '../../ui/Container/Container';
import s from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <Container className={s.container}>
      <h3 className={s.title}>
        Page not found. Click{' '}
        <Link to="/" className={s.accent}>
          here
        </Link>{' '}
        to go back.
      </h3>
    </Container>
  );
}
