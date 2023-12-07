// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Signin from "./components/login";
import Signup from "./components/signup";
import { RApolloProvider } from "@rocketgraphql/react-apollo";
import { auth } from "./utils/config";

ReactDOM.render(
  <React.StrictMode>
      <RApolloProvider auth={auth} gqlEndpoint="https://hasura-xxxxxx.rocketgraph.app/v1/graphql">
        <Router>
            <Routes>
              <Route path="/login" element={<Signin />}/>
              <Route path="/signup" element={<Signup />}/>
              <Route path="/" element={<App />} />
            </Routes>
        </Router>
      </RApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);