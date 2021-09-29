import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container className="text-center align-items-center justify-content-center">
      <h1>[404]</h1>
      <h3>Page not found.</h3>
      <h3>
        <Link to="/dashboard">Please go home.</Link>
      </h3>
    </Container>
  );
};

export default NotFound;
