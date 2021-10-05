import React, { useEffect, useContext, useState } from 'react';
import {
  auth,
  createUser,
  signInUser,
  resetPassword,
  changePassword,
} from '../firebase';

const AuthCtx = React.createContext();

export function useAuth() {
  return useContext(AuthCtx);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return createUser(auth, email, password);
  };

  const login = (email, password) => {
    return signInUser(auth, email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const forgotPassword = (email) => {
    return resetPassword(auth, email);
  };

  const changeUserPassword = (newPass) => {
    return changePassword(currentUser, newPass);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    forgotPassword,
    changeUserPassword,
  };

  return (
    <AuthCtx.Provider value={value}>{!loading && children}</AuthCtx.Provider>
  );
}
