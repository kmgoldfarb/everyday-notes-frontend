import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { useEffect, Suspense } from "react";
import Signup from "./user/pages/Signup";
import Login from "./user/pages/Login";
import AddNote from "./notes/pages/AddNote";
import Dashboard from "./user/pages/Dashboard";
import Landing from "./user/pages/Landing";
import MainNav from "./shared/Navigation/MainNav";
import Logout from "./user/pages/Logout";
import SingleNote from "./notes/pages/SingleNote";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./shared/Navigation/ProtectedRoute";
import NotFound from "./shared/Navigation/NotFound";

const ChangePassword = React.lazy(() =>
  import("./user/pages/ChangePassword.js")
);

let logoutTimer;

function App() {
  const { login, token, logout, tokenExpiration } = useAuth();

  useEffect(() => {
    if (token && tokenExpiration) {
      const remainingTime = tokenExpiration.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpiration, logout]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return (
    <BrowserRouter>
      <MainNav />
      <Suspense
        fallback={
          <div style={{ textAlign: "center" }}>
            <h3>Loading...</h3>
          </div>
        }
      >
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
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
