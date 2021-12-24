import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import BillManagement from "../pages/BillManagement";
import Products from "../pages/Products";
import Staffs from "../pages/Staffs";
import Salary from "../pages/Salary";
import Turnover from "../pages/Turnover";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Manage from "./staffs-details/manage";
import { NotFound, PrivateRoute } from "./common";
import Handle from "./product-details/handle";
import Manageluong from "./luong/manageluong";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/staff/:id" component={Manage} exact />
          <Route path="/product/:id" component={Handle} exact />
          <Route path="/billmanagement" component={BillManagement} />
          <Route path="/staffs" component={Staffs} exact />
          <Route path="/salary" component={Salary} exact />
          <Route path="/salary/:id" component={Manageluong} exact />
          <Route path="/products" component={Products} exact />
          <Route path="/turnover" component={Turnover} exact />
        </Switch>
      </PrivateRoute>

      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
