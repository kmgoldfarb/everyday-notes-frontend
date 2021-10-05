import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={() => {
        return currentUser ? <Component /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default ProtectedRoute;
