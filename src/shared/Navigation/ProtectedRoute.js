import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const userData = localStorage.getItem('userData');
  return (
    <Route
      {...rest}
      render={() => {
        return userData ? <Component /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default ProtectedRoute;
