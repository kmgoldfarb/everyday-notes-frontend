import { useRef, useState } from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { auth, createUser } from '../../firebase';

const Signup = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  async function handleSignup(event) {
    event.preventDefault();
    let user;
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match.');
    }
    try {
      setError('');
      setLoading(true);
      await createUser(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      ).then((userCredential) => {
        const user = userCredential.user;
        fetch(`${process.env.REACT_APP_SERVER_URL}/users/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: emailRef.current.value.toLowerCase(),
            uid: user.uid,
          }),
        });
      });
    } catch (err) {
      console.log(err);
      setError('Failed to create an account.');
    }
    setLoading(false);
    history.push('/dashboard');
  }

  /*  async function createUser(uid) {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/users/signup`, {
      method: 'POST',
      body: JSON.stringify({
        email: emailRef.current.value.toLowerCase(),
        id: uid,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } */

  /* async function handleSubmit(event) {
    event.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match.');
    }
    try {
      setError('');
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users/signup`,
        {
          method: 'POST',
          body: JSON.stringify({
            email: emailRef.current.value.toLowerCase(),
            password: passwordRef.current.value,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const responseData = await response.json();
      login(responseData.userId, responseData.token);
      history.push('/dashboard');
    } catch (err) {
      console.log(err);
      setError('Failed to create account.');
    }
    setLoading(false);
  } */

  return (
    <Container
      className="align-items-center justify-content-center"
      style={{ maxWidth: '500px' }}
    >
      <Card>
        <Card.Body>
          <h2 className="text-center mb-2">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSignup}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="passwordConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100 mt-4">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="text-center w-80 mt-4">
        Already have an account? <Link to="/login">Log in here.</Link>
      </div>
    </Container>
  );
};

export default Signup;
