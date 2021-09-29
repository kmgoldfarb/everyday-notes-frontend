import { Card, Button, Col } from "react-bootstrap";
import { useHistory } from "react-router";

const NoteCard = (props) => {
  const history = useHistory();
  const dateObj = new Date(props.date);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const readDate = dateObj.toLocaleDateString("en-US", options);
  const noteId = props.id;

  const getNoteHandler = (props) => {
    history.push(`notes/${noteId}`);
  };

  return (
    <Col>
      <Card style={{ margin: "1rem auto", width: "20rem" }} border="info">
        <Card.Body>
          {props.image && (
            <Card.Img
              variant="top"
              src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
              className="mb-4"
              style={{ width: "100%" }}
            />
          )}
          <Card.Title className="mb-4">{readDate}</Card.Title>
          <Card.Subtitle>Action:</Card.Subtitle>
          <Card.Text className="mb-4">{props.action}</Card.Text>
          <Card.Subtitle>Gratitude:</Card.Subtitle>
          <Card.Text className="mb-4"> {props.gratitude}</Card.Text>
          <Card.Subtitle>Mood:</Card.Subtitle>
          <Card.Text className="mb-2">{props.mood}</Card.Text>
        </Card.Body>
        <Button
          onClick={getNoteHandler}
          style={{ maxWidth: "50%", marginLeft: "1rem", marginBottom: "1rem" }}
        >
          Read full entry
        </Button>
      </Card>
    </Col>
  );
};

export default NoteCard;
