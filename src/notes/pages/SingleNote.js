import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useParams, useHistory } from "react-router";
import { Card, Button, Container, Modal, Alert } from "react-bootstrap";
import EditNote from "./EditNote";

const SingleNote = (props) => {
  const [note, setNote] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const history = useHistory();
  const { nid } = useParams();
  const { token } = useAuth();
  const noteId = nid;

  const getNoteById = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/notes/${noteId}`,
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
      console.log(responseData);
      setNote(responseData.note);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  });

  useEffect(() => {
    getNoteById();
  }, [getNoteById]);

  const deleteNoteHandler = async (event) => {
    event.preventDefault();
    try {
      await fetch(`${process.env.REACT_APP_SERVER_URL}/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer: " + token,
        },
      });
    } catch (err) {
      console.log(err);
    }
    history.push("/dashboard");
  };

  const showDeleteModalHandler = () => {
    setShowDeleteModal(true);
  };
  const hideDeleteModalHandler = () => {
    setShowDeleteModal(false);
  };
  const showEditModalHandler = () => {
    setShowEditModal(true);
  };
  const hideEditModalHandler = () => {
    setShowEditModal(false);
  };
  const backToDashboard = () => {
    history.push("/dashboard");
  };

  let fullNote;
  if (!isLoading && note) {
    const dateObj = new Date(note.date);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const readDate = dateObj.toLocaleDateString("en-US", options);
    fullNote = (
      <Card border="primary" style={{ margin: "2rem" }}>
        <Card.Header as="h3">{readDate}</Card.Header>
        {error && <Alert variant="danger">{error}</Alert>}
        <Card.Body>
          <h5>Journal:</h5>
          <p>{note.journal}</p>
          <h5>Action:</h5>
          <p>{note.action}</p>
          <h5>Gratitude:</h5>
          <p>{note.gratitude}</p>
          <h5>Mood:</h5>
          <p>{note.mood}</p>
          {note.image && (
            <Card.Img
              src={`${process.env.REACT_APP_ASSET_URL}/${note.image}`}
              className="mb-4"
              style={{ maxWidth: "600px" }}
            />
          )}
        </Card.Body>
        <Card.Footer>
          <Button
            variant="info"
            style={{ marginRight: "1rem", color: "white" }}
            onClick={showEditModalHandler}
          >
            Edit
          </Button>
          <Button variant="danger" onClick={showDeleteModalHandler}>
            Delete
          </Button>
        </Card.Footer>
      </Card>
    );
  }

  return (
    <>
      <Container className="align-items-center justify-content-center">
        {showDeleteModal && (
          <Modal show={showDeleteModal} onHide={hideDeleteModalHandler}>
            <Modal.Header>
              <Modal.Title>Delete entry?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Are you sure you want to delete this entry? You will be unable
                to recover it later.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={hideDeleteModalHandler}>
                Cancel
              </Button>
              <Button variant="danger" onClick={deleteNoteHandler}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {showEditModal && (
          <Modal show={showEditModal} onHide={hideEditModalHandler}>
            <EditNote closeEditModal={hideEditModalHandler} noteId={nid} />
          </Modal>
        )}
        {isLoading && <h2>Loading your note...</h2>}
        {!isLoading && note && fullNote}
        <Button
          onClick={backToDashboard}
          style={{ marginLeft: "2rem", marginBottom: "1rem" }}
        >
          Go back to your notes
        </Button>
      </Container>
    </>
  );
};

export default SingleNote;
