import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Main as MainView } from "./views";

const Routes = () => {
  let routes = (
    <Switch>
      <Route exact path="/" component={MainView} />

      <Redirect exact to="/" />
    </Switch>
  );

  return routes;
};

export default Routes;
