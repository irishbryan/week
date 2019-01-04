import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import configureStore from "./utils/configure-store";
import DevTools from "./utils/dev-tools";

import "./assets/css/open-iconic.css"
import "./index.css";
import theme from "./theme";

import App from "./App";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Fragment>
        <App />
        {process.env.NODE_ENV !== "production" && <DevTools />}
      </Fragment>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
