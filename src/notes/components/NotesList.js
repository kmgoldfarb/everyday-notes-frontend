import NoteCard from './NoteCard';
import { Container, Row } from 'react-bootstrap';

const NotesList = props => {
  return (
    <Container>
      <Row>
        {props.data.map(note => (
          <NoteCard
            key={note.id}
            id={note.id}
            date={note.date}
            action={note.action}
            gratitude={note.gratitude}
            journal={note.journal}
            mood={note.mood}
            image={note.image}
          />
        ))}
      </Row>
    </Container>
  );
};

export default NotesList;
