import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const intialToken = localStorage.getItem("token");
  const [token, setToken] = useState(intialToken);

  const userIsLoggedIn = !!token;

  function loginHandler(token) {
    localStorage.setItem("token", token);
    setToken(token);
  }

  function logoutHandler() {
    localStorage.removeItem("token");
    setToken(null);
  }

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
