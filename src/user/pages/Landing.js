import { Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router';
import styles from './Landing.module.css';

const Landing = () => {
  const history = useHistory();
  const signUpButtonHandler = () => {
    history.push('/signup');
  };
  const loginButtonHandler = () => {
    history.push('/login');
  };

  return (
    <div className={styles.body}>
      <Container className={styles.home} fluid>
        <div>
          <h1>Everday Notes</h1>
          <h3>A place to practice reflection in your daily life.</h3>
          <p>
            Upload daily journal entries that chronicle your actions, mood,
            gratitude, and thoughts. Attach an image that represents the day.
            Access your journal from anywhere.
          </p>
        </div>
        <div className={styles.button}>
          <Button
            className="m-1"
            variant="outline-light"
            onClick={signUpButtonHandler}
          >
            Sign Up
          </Button>
          <Button
            className="m-1"
            variant="outline-light"
            onClick={loginButtonHandler}
          >
            Login
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Landing;
