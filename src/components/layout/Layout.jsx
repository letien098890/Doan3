import React, { useEffect } from "react";

import "./layout.css";

import Sidebar from "../sidebar/Sidebar";
import TopNav from "../topnav/TopNav";
import Routes from "../Routes";

import { BrowserRouter, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import ThemeAction from "../../redux/actions/ThemeAction";

const Layout = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode", "theme-mode-light");

    const colorClass = localStorage.getItem("colorMode", "theme-mode-light");

    dispatch(ThemeAction.setMode(themeClass));

    dispatch(ThemeAction.setColor(colorClass));
  }, [dispatch]);
  console.log(window.location.pathname);
  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
            {!(
              window.location.pathname === "/login" ||
              window.location.pathname === "/register"
            ) ? (
              <Sidebar {...props} />
            ) : null}
            <div
              className={
                !(
                  window.location.pathname === "/login" ||
                  window.location.pathname === "/register"
                ) && "layout__content"
              }
            >
              {!(
                window.location.pathname === "/login" ||
                window.location.pathname === "/register"
              ) ? (
                <TopNav />
              ) : null}

              <div className="layout__content-main">
                <Routes />
              </div>
            </div>
          </div>
        )}
      />
    </BrowserRouter>
  );
};

export default Layout;
