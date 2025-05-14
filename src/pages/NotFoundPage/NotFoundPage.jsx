import { Link } from 'react-router';
import Container from '../../ui/Container/Container';

export default function NotFoundPage() {
  return (
    <Container>
      <h6>
        Page not found. Click <Link to="/">here</Link> to go back.
      </h6>
    </Container>
  );
}
