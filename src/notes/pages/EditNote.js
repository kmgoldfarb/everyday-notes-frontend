import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect, useRef, useCallback } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useParams, useHistory } from "react-router";

const EditNote = (props) => {
  const [startDate, setStartDate] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [loadedNote, setLoadedNote] = useState();
  const [image, setImage] = useState();
  const { token, userId } = useAuth();
  const { nid } = useParams();
  const history = useHistory();
  const actionRef = useRef();
  const gratitudeRef = useRef();
  const journalRef = useRef();
  const moodRef = useRef();
  const imageRef = useRef();

  let actionPlaceholder;
  let gratitudePlaceholder;
  let moodPlaceholder;
  let journalPlaceholder;
  let datePlaceholder;
  let imagePlaceholder;

  const getNoteById = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/notes/${nid}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer: " + token,
          },
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setLoadedNote(responseData.note);
      setStartDate(new Date(responseData.note.date));
      console.log(responseData.note);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    getNoteById();
  }, [getNoteById]);

  const imageSelectHandler = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      const selectedImage = event.target.files[0];
      console.log(selectedImage);
      setImage(selectedImage);
    } else {
      alert("Please pick a valid image.");
    }
  };

  const editNoteHandler = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("date", startDate);
      formData.append("action", actionRef.current.value);
      formData.append("gratitude", gratitudeRef.current.value);
      formData.append("mood", moodRef.current.value);
      formData.append("journal", journalRef.current.value);
      formData.append("creator", userId);
      if (image) {
        formData.append("image", image);
      }
      await fetch(`${process.env.REACT_APP_SERVER_URL}/notes/${nid}`, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: "Bearer: " + token,
        },
      });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
    props.closeEditModal();
    history.push("/dashboard");
  };

  if (!isLoading && loadedNote) {
    actionPlaceholder = loadedNote.action;
    gratitudePlaceholder = loadedNote.gratitude;
    moodPlaceholder = loadedNote.mood;
    journalPlaceholder = loadedNote.journal;
    datePlaceholder = loadedNote.date;
    imagePlaceholder = "";
    if (loadedNote.image) {
      imagePlaceholder = loadedNote.image;
    }
  }

  const noteForm = (
    <Container
      className="align-items-center justify-content-center"
      style={{ maxWidth: "800px" }}
    >
      <Card className="mt-4 mb-4">
        <Card.Body>
          <h2 className="text-center mb-2">Edit Note</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={editNoteHandler}>
            <Form.Group className="mb-4" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="mb-2"
                locale="en-US"
                defaultValue={datePlaceholder}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formAction">
              <Form.Label>Action</Form.Label>
              <Form.Control
                defaultValue={actionPlaceholder}
                ref={actionRef}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formGratitude">
              <Form.Label>Gratitude</Form.Label>
              <Form.Control
                defaultValue={gratitudePlaceholder}
                ref={gratitudeRef}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formMood">
              <Form.Label>Mood</Form.Label>
              <Form.Control
                defaultValue={moodPlaceholder}
                ref={moodRef}
                required
              />
              <Form.Text className="text-muted mt-1">
                Do you need some help figuring out what you're feeling? Check
                out{" "}
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
                defaultValue={journalPlaceholder}
                style={{ height: "100px" }}
                ref={journalRef}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formFile">
              <Form.Label>Add an image from today:</Form.Label>
              <br />
              <Form.Control
                ref={imageRef}
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={imageSelectHandler}
              />
            </Form.Group>
            <Button variant="secondary" style={{ marginRight: "1rem" }}>
              Cancel
            </Button>
            <Button
              variant="info"
              disabled={isLoading}
              type="submit"
              style={{ color: "white" }}
            >
              Update entry
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );

  return (
    <>
      {!isLoading && loadedNote && noteForm}
      {isLoading && <p>Loading your note...</p>}
    </>
  );
};

export default EditNote;
