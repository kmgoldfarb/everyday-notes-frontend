import { useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const emailRef = useRef();
  const { forgotPassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    try {
      setMessage('');
      setError('');
      setLoading(true);
      await forgotPassword(emailRef.current.value);
      setMessage('Check your inbox for futher instructions.');
    } catch (err) {
      setError('Failed to reset password.');
    }
    setLoading(false);
  };

  return (
    <Container
      className="align-items-center justify-content-center"
      style={{ maxWidth: '500px' }}
    >
      <Card>
        <Card.Body>
          <h2 className="text-center mb-2">Forgot Password?</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handlePasswordReset}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100 mt-4">
              Reset Password
            </Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mt-2 mb-4">
          <Link to="/login">Log in here.</Link>
        </div>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
