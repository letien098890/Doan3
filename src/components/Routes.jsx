import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Products from "../pages/Products";
import Staffs from "../pages/Staffs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Manage from "./staffs-details/manage";
import { NotFound, PrivateRoute } from "./common";
import Handle from "./product-details/handle";
import Catalog from "../pages/Catalog";

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
          <Route path="/customers" component={Customers} />
          <Route path="/staffs" component={Staffs} exact />
          <Route path="/products" component={Products} exact />
          <Route path="/catalog" component={Catalog} exact />
        </Switch>
      </PrivateRoute>

      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
