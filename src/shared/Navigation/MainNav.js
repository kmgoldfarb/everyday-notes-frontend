import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { LinkContainer } from 'react-router-bootstrap';

const MainNav = () => {
  const { currentUser } = useAuth();

  return (
    <Navbar collapseOnSelect expand="md" style={{ margin: '1rem' }}>
      <LinkContainer to={currentUser ? '/dashboard' : '/'}>
        <Navbar.Brand>Everyday Notes</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {currentUser && (
          <Nav>
            <Nav.Item>
              <Nav.Link>
                <NavLink to="/dashboard">Your Notes</NavLink>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <NavLink to="/add-note">Add Note</NavLink>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <NavLink to="/change-password">Change Password</NavLink>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <NavLink to="/logout">Logout</NavLink>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}
        {!currentUser && (
          <Nav>
            <Nav.Item>
              <Nav.Link>
                <NavLink to="/login">Login</NavLink>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <NavLink to="/signup">Sign Up</NavLink>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNav;
