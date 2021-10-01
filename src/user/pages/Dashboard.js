import { useEffect, useState } from 'react';
import NotesList from '../../notes/components/NotesList';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const [notes, setNotes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const getNotes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/users/${currentUser.uid}`,
          {
            method: 'GET',
            headers: { Authorization: 'Bearer: ' + currentUser.accessToken },
          }
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setNotes(responseData.notes);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    };
    getNotes();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Your Notes</h1>
      <div>
        {notes && !isLoading && <NotesList data={notes} />}
        {notes && notes.length === 0 && !isLoading && (
          <div className="centered text-center mt-4">
            <h4 className="mb-4">Looks like you don't have any notes.</h4>
            <Button
              onClick={() => {
                history.push('/add-note');
              }}
            >
              Add your first note here
            </Button>
          </div>
        )}
        {error && error}
      </div>
    </>
  );
};

export default Dashboard;
