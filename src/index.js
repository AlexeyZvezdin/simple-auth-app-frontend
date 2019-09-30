import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App.js";
import store from "./components/redux/store";

ReactDOM.render(
  <Provider store={store}>
    {`${store.getState().signed}`}
    <App />
  </Provider>,
  document.getElementById("root")
);
