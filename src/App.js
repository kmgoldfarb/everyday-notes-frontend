import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Suspense } from 'react';
import Signup from './user/pages/Signup';
import Login from './user/pages/Login';
import AddNote from './notes/pages/AddNote';
import Dashboard from './user/pages/Dashboard';
import Landing from './user/pages/Landing';
import MainNav from './shared/Navigation/MainNav';
import Logout from './user/pages/Logout';
import SingleNote from './notes/pages/SingleNote';
import ProtectedRoute from './shared/Navigation/ProtectedRoute';
import NotFound from './shared/Navigation/NotFound';
import ForgotPassword from './user/pages/ForgotPassword';

const ChangePassword = React.lazy(() =>
  import('./user/pages/ChangePassword.js')
);

function App() {
  return (
    <BrowserRouter>
      <MainNav />
      <Suspense
        fallback={
          <div style={{ textAlign: 'center' }}>
            <h3>Loading...</h3>
          </div>
        }
      >
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <ProtectedRoute path="/add-note" component={AddNote} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <ProtectedRoute path="/logout" component={Logout} />
          <ProtectedRoute path="/change-password" component={ChangePassword} />
          <ProtectedRoute path="/notes/:nid" component={SingleNote} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
