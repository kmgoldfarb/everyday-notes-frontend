import { onAuthStateChanged } from '@firebase/auth';
import React, { useEffect, useContext, useState } from 'react';
import { auth, createUser, signInUser, resetPassword } from '../firebase';

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

  const getCurrentUser = () => {
    const user = auth.currentUser;
    return user;
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
    getCurrentUser,
  };
  /*   const [tokenExpiration, setTokenExpiration] = useState();
  const [userId, setUserId] = useState();
  const [token, setToken] = useState();

  const signup = async (email, password) => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/users/signup`,
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json({ status: "ok" }));
    if (response.status !== "ok") {
      alert(response.error);
    }
  };

  const login = useCallback((userId, token, expiration) => {
    setUserId(userId);
    setToken(token);
    const tokenExpirationDate =
      expiration || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpiration(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        token: token,
        userId: userId,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const changePassword = async (newPass, token) => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/users/change-password`, {
      method: "PATCH",
      body: JSON.stringify({
        newpassword: newPass,
        token: token,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer: " + token,
      },
    });
  };

  const logout = useCallback(() => {
    setUserId(null);
    setToken(null);
    setTokenExpiration(null);
    localStorage.removeItem("userData");
  }, []);
 */

  return (
    <AuthCtx.Provider value={value}>{!loading && children}</AuthCtx.Provider>
  );
}
