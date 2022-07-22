import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calcExpiryTime = (expiryTime) => {
  const currentTime = new Date().getTime();
  const adjExpiryTime = new Date(expiryTime).getTime();
  const remaining = adjExpiryTime - currentTime;

  return remaining;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpiryTime = localStorage.getItem("expiresin");

  const remainingTime = calcExpiryTime(storedExpiryTime);

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresin");
    return null;
  }
  return { token: storedToken, duration: remainingTime };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;

  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const navigate = useNavigate();

  const userIsLoggedIn = !!token;

  const logOutHandler = useCallback(
    (token) => {
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("expiresin");

      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }

      navigate("/login", { replace: true });
    },
    [navigate]
  );

  const logInHandler = (token, expiryTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expiresin", expiryTime);
    const remainingTime = calcExpiryTime(expiryTime);

    logoutTimer = setTimeout(logOutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logOutHandler, tokenData.duration);
    }
  }, [tokenData, logOutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: logInHandler,
    logout: logOutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
