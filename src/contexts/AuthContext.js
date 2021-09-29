import React, { useCallback, useContext, useState } from "react";

const AuthCtx = React.createContext();

export function useAuth() {
  return useContext(AuthCtx);
}

export function AuthProvider({ children }) {
  const [tokenExpiration, setTokenExpiration] = useState();
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

  const value = {
    userId,
    token,
    signup,
    login,
    changePassword,
    logout,
    tokenExpiration,
  };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
