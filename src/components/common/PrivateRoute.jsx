import React from "react";
import { Redirect, Route } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

export const PrivateRoute = (props) => {
  const { currentUser } = useAuth();

  return <> {currentUser ? <Route {...props} /> : <Redirect to="/login" />}</>;
};
