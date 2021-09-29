import { Link, useHistory } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: emailRef.current.value.toLowerCase(),
            password: passwordRef.current.value,
          }),
        }
      );
      const responseData = await response.json();
      if (responseData.status === 'error') {
        setError(responseData.message);
        setLoading(false);
        throw new Error('Credentials invalid. Please try again.');
      }
      login(responseData.userId, responseData.token);
      setLoading(false);
      setError('');
      history.push('/dashboard');
    } catch {
      setError('There was a problem logging in. Please try again.');
    }
  }

  return (
    <Container
      className="align-items-center justify-content-center"
      style={{ maxWidth: '500px' }}
    >
      <Card>
        <Card.Body>
          <h2 className="text-center mb-2">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100 mt-4">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-4">
        Need an account? <Link to="/signup">Sign up here.</Link>
      </div>
    </Container>
  );
};

export default Login;
