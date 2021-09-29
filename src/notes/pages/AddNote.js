import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router';

const AddNote = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const history = useHistory();
  const { userId, token } = useAuth();
  const actionRef = useRef();
  const gratitudeRef = useRef();
  const journalRef = useRef();
  const moodRef = useRef();

  const imageSelectHandler = event => {
    if (event.target.files && event.target.files.length === 1) {
      const selectedImage = event.target.files[0];
      console.log(selectedImage);
      setImage(selectedImage);
    } else {
      alert('Please pick a valid image.');
    }
  };

  const noteSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('date', startDate);
      formData.append('action', actionRef.current.value);
      formData.append('gratitude', gratitudeRef.current.value);
      formData.append('mood', moodRef.current.value);
      formData.append('journal', journalRef.current.value);
      formData.append('creator', userId);
      if (image) {
        formData.append('image', image);
      }
      await fetch(`${process.env.REACT_APP_SERVER_URL}/notes/add-note`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer: ' + token,
        },
      });
    } catch (err) {
      console.log(err);
    }
    history.push('/dashboard');
  };

  return (
    <Container
      className="align-items-center justify-content-center"
      style={{ maxWidth: '800px' }}
    >
      <Card>
        <Card.Body>
          <h2 className="text-center mb-3">Add Note</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={noteSubmitHandler}>
            <Form.Group className="mb-2" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                className="mb-2"
                locale="en-US"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formAction">
              <Form.Label>Action</Form.Label>
              <Form.Control
                placeholder="What's one thing you did today?"
                ref={actionRef}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formGratitude">
              <Form.Label>Gratitude</Form.Label>
              <Form.Control
                placeholder="What's one thing you're thankful for today?"
                ref={gratitudeRef}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formMood">
              <Form.Label>Mood</Form.Label>
              <Form.Control
                placeholder="How are you feeling today?"
                ref={moodRef}
                required
              />
              <Form.Text className="text-muted mt-1">
                Do you need some help figuring out what you're feeling? Check
                out{' '}
                <a
                  href="https://feelingswheel.com/"
                  rel="noreferrer"
                  target="_blank"
                >
                  this helpful resource.
                </a>
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-4" controlId="formJournal">
              <Form.Label>Journal:</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="How were things today?"
                style={{ height: '100px' }}
                ref={journalRef}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formFile">
              <Form.Label>Add an image from today:</Form.Label>
              <br />
              <Form.Control
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={imageSelectHandler}
              />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100">
              Submit note for today.
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddNote;
