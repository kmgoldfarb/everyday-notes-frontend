import { useRef, useState } from 'react';
import { Card, Form, Button, Container, Alert, Modal } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router';

const ChangePassword = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordSuccessModal, setPasswordSuccessModal] = useState(false);
  const { changeUserPassword } = useAuth();
  const newPasswordRef = useRef();
  const newPasswordConfirmRef = useRef();
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (newPasswordConfirmRef.current.value === newPasswordRef.current.value) {
      try {
        await changeUserPassword(newPasswordRef.current.value);
        setLoading(false);
        setPasswordSuccessModal(true);
      } catch (err) {
        setError(err);
        console.log(err);
      }
    }
    setLoading(false);
  };

  const hidePasswordSuccessModal = () => {
    setPasswordSuccessModal(false);
    history.push('/dashboard');
  };

  return (
    <Container
      className="align-items-center justify-content-center"
      style={{ maxWidth: '500px' }}
    >
      {setPasswordSuccessModal && !loading && (
        <Modal show={passwordSuccessModal} onHide={hidePasswordSuccessModal}>
          <Modal.Header>
            <Modal.Title>Password Changed</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Your password has successfully been changed.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                history.push('/dashboard');
              }}
            >
              Go to dashboard
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Change Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="newPassword" className="mb-4">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" ref={newPasswordRef} required />
            </Form.Group>
            <Form.Group id="newPasswordConfirm" className="mb-4">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                ref={newPasswordConfirmRef}
                required
              />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100 mb-4">
              Change Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ChangePassword;
