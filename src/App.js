import React from "react";
// react-redux
import { Provider } from "react-redux";
import configureStore from "state";
// react-router
import { BrowserRouter as Router } from "react-router-dom";
import RouteWrapper from "./Route";
// graphQL
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { API_CMS } from "./query/config";

import "../node_modules/@fortawesome/fontawesome-free/js/all";
import "bootstrap/dist/css/bootstrap.css";

// Configuration graphQL
const client = new ApolloClient({
  uri: API_CMS,
  cache: new InMemoryCache(),
});

// Configuration reducer
const initialState = window.initialReduxState;
const store = configureStore(initialState);

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
            <RouteWrapper />
          </Router>
        </Provider>
      </ApolloProvider>
    </div>
  );
}

export default App;
