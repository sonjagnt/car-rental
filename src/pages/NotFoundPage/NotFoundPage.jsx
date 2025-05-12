import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div>
      <h6>
        Page not found. Click <Link to="/">here</Link> to go back.
      </h6>
    </div>
  );
}
