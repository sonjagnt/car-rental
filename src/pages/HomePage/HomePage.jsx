import Home from '../../components/Home/Home';
import Container from '../../ui/Container/Container';
import s from './HomePage.module.css';

export default function HomePage() {
  return (
    <section className={s.section}>
      <Container>
        <Home />
      </Container>
    </section>
  );
}
