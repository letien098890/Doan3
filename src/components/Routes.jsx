import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Staffs from "../pages/Staffs";
import Login from "../pages/Login";
import Manage from "./staffs-details/manage";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/staff/:id" component={Manage} exact />
      <Route path="/customers" component={Customers} />
      <Route path="/staffs" component={Staffs} exact />
      <Route path="/login" component={Login} />
    </Switch>
  );
};

export default Routes;
