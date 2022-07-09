import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import { RApolloProvider } from "@kaushik_varanasi/react-apollo";

ReactDOM.render(
  <React.StrictMode>
    <RApolloProvider gqlEndpoint="https://hasura-qlvtp9u.rocketgraph.app/v1/graphql">
      <Router>
          <Switch>
            <Route exact path="/">
              <App />
            </Route>
          </Switch>
      </Router>
    </RApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);