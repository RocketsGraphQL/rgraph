// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { Login } from "./components/login";
import { Signup } from "./components/signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import { RApolloProvider } from "@rocketgraphql/react-apollo";
import { auth } from "./utils/rockets";

ReactDOM.render(
  <React.StrictMode>
    <RApolloProvider auth={auth} gqlEndpoint="https://hasura-1cbijog.rocketgraph.app/v1/graphql">
      <Router>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/">
              <App />
            </Route>
          </Switch>
      </Router>
    </RApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);