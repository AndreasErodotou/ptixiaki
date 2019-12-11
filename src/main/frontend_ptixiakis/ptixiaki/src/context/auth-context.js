import React from "react";

const auth = new React.createContext({
  isAuthenticated: false,
  token: null,
  userId: null,
  accountType: null,
  username: null
});

export default auth;
