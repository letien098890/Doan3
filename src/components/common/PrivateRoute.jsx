import React from "react";
import { Redirect, Route } from "react-router";

export const PrivateRoute = (props) => {
  // const isLoggedIn = Boolean(localStorage.getItem("access_token"));
  // if (!isLoggedIn) return <Redirect to="/login" />;
  return <Route {...props} />;
};
