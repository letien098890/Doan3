import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import PropTypes from "prop-types";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return signOut();
  }

  // function resetPassword(email) {
  //   return auth.sendPasswordResetEmail(email);
  // }

  // function updateEmail(email) {
  //   return currentUser.updateEmail(email);
  // }

  // function updatePassword(password) {
  //   return currentUser.updatePassword(password);
  // }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
AuthProvider.propTypes = { children: PropTypes.any };
